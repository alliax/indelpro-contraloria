import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TiposStore, TiposState } from './tipos.store';

@Injectable({ providedIn: 'root' })
export class TiposQuery extends QueryEntity<TiposState> {
  constructor(protected store: TiposStore) {
    super(store);
  }
}
