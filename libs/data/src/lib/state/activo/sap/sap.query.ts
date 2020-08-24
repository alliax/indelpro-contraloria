import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SapStore, SapState } from './sap.store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Sap } from './sap.model';

@Injectable({ providedIn: 'root' })
export class SapQuery extends QueryEntity<SapState> {
  $activa: Observable<Sap> = this.selectAll().pipe(
    map((saps) => saps.find((sap) => sap.activo === true))
  );
  constructor(protected store: SapStore) {
    super(store);
  }
}
