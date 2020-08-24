import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UbicacionesStore, UbicacionesState } from './ubicaciones.store';
import {
  combineAll,
  combineLatest,
  concatMap,
  groupBy,
  map,
  mergeAll,
  mergeMap,
  scan,
  switchMap,
  tap,
  toArray,
  zip,
  zipAll,
} from 'rxjs/operators';
import { Ubicacion } from './ubicacion.model';
import { from, GroupedObservable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UbicacionesQuery extends QueryEntity<UbicacionesState> {
  agrupadas$ = this.selectAll().pipe(
    map((ubicaciones: Ubicacion[]) =>
      ubicaciones.sort((a, b) =>
        a.grupoUbicacion.nombre.localeCompare(b.grupoUbicacion.nombre)
      )
    )
  );

  constructor(protected store: UbicacionesStore) {
    super(store);
  }
}
