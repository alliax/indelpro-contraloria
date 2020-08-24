import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';
import { Ubicacion } from './ubicacion.model';

export interface UbicacionesState extends EntityState<Ubicacion>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ubicaciones', idKey: '_id' })
export class UbicacionesStore extends EntityStore<UbicacionesState> {
  constructor() {
    super();
  }
}
