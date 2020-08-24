import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';
import { GrupoUbicacion } from './grupo-ubicacion.model';

export interface GrupoUbicacionesState
  extends EntityState<GrupoUbicacion>,
    ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'grupo-ubicaciones', idKey: '_id' })
export class GrupoUbicacionesStore extends EntityStore<GrupoUbicacionesState> {
  constructor() {
    super();
  }
}
