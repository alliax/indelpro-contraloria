import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';
import { SapFormas } from './sap.model';

export interface SapFormasState extends EntityState<SapFormas>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sap', idKey: '_id' })
export class SapFormasStore extends EntityStore<SapFormasState> {
  constructor() {
    super();
  }
}
