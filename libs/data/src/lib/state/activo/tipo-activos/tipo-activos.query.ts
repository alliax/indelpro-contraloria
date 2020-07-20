import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TipoActivosStore, TipoActivosState } from './tipo-activos.store';

@Injectable({ providedIn: 'root' })
export class TipoActivosQuery extends QueryEntity<TipoActivosState> {

  constructor(protected store: TipoActivosStore) {
    super(store);
  }

}
