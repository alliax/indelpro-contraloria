import { Injectable } from '@angular/core';
import { Tipo } from './tipo.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export interface TiposState extends EntityState<Tipo>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tipos', idKey: '_id' })
export class TiposStore extends EntityStore<TiposState> {
  constructor() {
    super();
  }
}
