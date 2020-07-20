import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TipoActivo } from './tipo-activo.model';

export interface TipoActivosState extends EntityState<TipoActivo> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tipo-activos', idKey: '_id' })
export class TipoActivosStore extends EntityStore<TipoActivosState> {
  constructor() {
    super();
  }
}
