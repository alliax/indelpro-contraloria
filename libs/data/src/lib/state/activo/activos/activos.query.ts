import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ActivosStore, ActivosState } from './activos.store';
import { merge, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Expediente } from '@indelpro-contraloria/data';
import { Activo } from './activo.model';

@Injectable({ providedIn: 'root' })
export class ActivosQuery extends QueryEntity<ActivosState> {
  limit$ = this.select((state) => state.ui.limit);
  page$ = this.select((state) => state.ui.page);
  ultimaActualizacion$ = this.select((state) => state.ui.ultimaActualizacion);
  activo$ = this.select((state) => state.ui.activo);
  total$: Observable<number> = this.selectCount();
  fechaSeleccionada$ = this.select((state) => state.ui.fecha).pipe(
    map((fecha) => new Date(fecha).toISOString())
  );

  paginados$ = merge(this.limit$, this.page$, this.selectAll()).pipe(
    withLatestFrom(this.limit$, this.page$, this.selectAll()),
    map((value: [any, number, number, Activo[]]) => {
      const limit = value[1];
      const page = value[2];
      const expedientes = value[3];
      return expedientes.slice((page - 1) * limit, page * limit);
    })
  );
  constructor(protected store: ActivosStore) {
    super(store);
  }
}
