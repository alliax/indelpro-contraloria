import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SapFormasStore, SapFormasState } from './sap.store';

@Injectable({ providedIn: 'root' })
export class SapFormasQuery extends QueryEntity<SapFormasState> {

  constructor(protected store: SapFormasStore) {
    super(store);
  }

}
