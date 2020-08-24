import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';
import { Sap } from './sap.model';

export interface SapState extends EntityState<Sap>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sap', idKey: '_id' })
export class SapStore extends EntityStore<SapState> {
  constructor() {
    super();
  }
}
