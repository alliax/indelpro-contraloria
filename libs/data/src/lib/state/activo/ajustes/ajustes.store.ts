import { Injectable } from '@angular/core';
import { Ajuste } from './ajuste.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface AjustesState extends EntityState<Ajuste> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ajustes' })
export class AjustesStore extends EntityStore<AjustesState> {

  constructor() {
    super();
  }

}

