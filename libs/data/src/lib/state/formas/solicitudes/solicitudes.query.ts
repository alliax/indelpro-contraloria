import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SolicitudesStore, SolicitudesState } from './solicitudes.store';
import { Observable, merge, forkJoin, zip, combineLatest } from 'rxjs';
import { Solicitud } from './solicitud.model';
import { map, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { TiposQuery } from '../tipos/tipos.query';
import { Tipo } from '../tipos/tipo.model';

@Injectable({ providedIn: 'root' })
export class SolicitudesQuery extends QueryEntity<SolicitudesState> {
  totalSolicitudes$: Observable<number> = this.selectCount();
  totalPendientes$: Observable<number> = this.selectCount(
    (solicitud) => solicitud.STATUS === 'PENDIENTE'
  );
  totalPropias$: Observable<number> = this.selectCount(
    (solicitud) => solicitud.STATUS === 'ENVIADO'
  );

  solicitudes$: Observable<Solicitud[]> = this.selectAll();
  pendientes$: Observable<Solicitud[]> = this.solicitudes$.pipe(
    map((solicitudes: Solicitud[]) =>
      solicitudes.filter((solicitud) => solicitud.STATUS === 'PENDIENTE')
    )
  );
  propias$: Observable<Solicitud[]> = this.solicitudes$.pipe(
    map((solicitudes: Solicitud[]) =>
      solicitudes.filter((solicitud) => solicitud.STATUS === 'ENVIADO')
    )
  );

  pendientesPorTipoSeleccionado$: Observable<Solicitud[]> = combineLatest([
    this.select((state) => state.ui.tipoSeleccionado),
    this.pendientes$,
  ]).pipe(
    map((tipoPendientes: [string, Solicitud[]]) =>
      tipoPendientes[1].filter(
        (solicitud: Solicitud) => solicitud.TYPE === tipoPendientes[0]
      )
    )
  );

  pendientesPorTipo$: Observable<any> = combineLatest([
    this.tipos.selectAll(),
    this.pendientes$,
  ]).pipe(
    tap(val => console.log(val)),
    map((tipos: [Tipo[], Solicitud[]]) =>
      tipos[0].map((tipo: Tipo) => ({
        nombre: tipo.nombre,
        clave: tipo.clave,
        grupo: 'pendientes',
        total: tipos[1].filter(
          (solicitud: Solicitud) => solicitud.TYPE === tipo.clave
        ).length,
      }))
    ),
    map((tipos) => tipos.sort((a, b) => b.total - a.total))
  );

  propiasPorTipo$: Observable<any> = combineLatest([
    this.tipos.selectAll(),
    this.propias$,
  ]).pipe(
    map((tipos: [Tipo[], Solicitud[]]) =>
      tipos[0].map((tipo: Tipo) => ({
        nombre: tipo.nombre,
        clave: tipo.clave,
        grupo: 'enviadas',
        total: tipos[1].filter(
          (solicitud: Solicitud) => solicitud.TYPE === tipo.clave
        ).length,
      }))
    ),
    map((tipos) => tipos.sort((a, b) => b.total - a.total))
  );

  propiasPorTipoSeleccionado$: Observable<Solicitud[]> = combineLatest([
    this.select((state) => state.ui.tipoSeleccionado),
    this.propias$,
  ]).pipe(
    map((tipoPropias: [string, Solicitud[]]) =>
      tipoPropias[1].filter(
        (solicitud: Solicitud) => solicitud.TYPE === tipoPropias[0]
      )
    )
  );

  filtradas$: Observable<Solicitud[]> = this.select(
    (state) => state.ui.busqueda
  ).pipe(
    withLatestFrom(this.solicitudes$),
    map((enviadas: [string, Solicitud[]]) =>
      enviadas[1].filter((solicitud) =>
        !enviadas[0] || enviadas[0].length === 0
          ? false
          : solicitud.IDWFC.includes(enviadas[0]) ||
            solicitud.TITLE.includes(enviadas[0])
      )
    )
  );

  constructor(protected store: SolicitudesStore, protected tipos: TiposQuery) {
    super(store);
  }
}
