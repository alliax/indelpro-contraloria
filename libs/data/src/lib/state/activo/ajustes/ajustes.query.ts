import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AjustesStore, AjustesState } from './ajustes.store';

@Injectable({ providedIn: 'root' })
export class AjustesQuery extends QueryEntity<AjustesState> {

  constructor(protected store: AjustesStore) {
    super(store);
  }

}
