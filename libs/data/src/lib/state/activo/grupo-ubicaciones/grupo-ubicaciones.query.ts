import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {
  GrupoUbicacionesStore,
  GrupoUbicacionesState,
} from './grupo-ubicaciones.store';

@Injectable({ providedIn: 'root' })
export class GrupoUbicacionesQuery extends QueryEntity<GrupoUbicacionesState> {
  constructor(protected store: GrupoUbicacionesStore) {
    super(store);
  }
}
