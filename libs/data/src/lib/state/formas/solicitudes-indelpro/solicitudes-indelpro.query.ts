import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SolicitudesIndelproStore, SolicitudesIndelproState } from './solicitudes-indelpro.store';

@Injectable({ providedIn: 'root' })
export class SolicitudesIndelproQuery extends QueryEntity<SolicitudesIndelproState> {

  constructor(protected store: SolicitudesIndelproStore) {
    super(store);
  }

}
