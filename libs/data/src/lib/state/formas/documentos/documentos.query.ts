import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DocumentosStore, DocumentosState } from './documentos.store';

@Injectable({ providedIn: 'root' })
export class DocumentosQuery extends QueryEntity<DocumentosState> {

  constructor(protected store: DocumentosStore) {
    super(store);
  }

}
