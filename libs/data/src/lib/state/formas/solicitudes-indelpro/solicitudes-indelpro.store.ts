import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { SolicitudesIndelpro } from './solicitudes-indelpro.model';

export interface SolicitudesIndelproState extends EntityState<SolicitudesIndelpro>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'solicitudes-indelpro' })
export class SolicitudesIndelproStore extends EntityStore<SolicitudesIndelproState> {

  constructor() {
    super();
  }

}
