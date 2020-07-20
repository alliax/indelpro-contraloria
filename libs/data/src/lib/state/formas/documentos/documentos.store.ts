import { Injectable } from '@angular/core';
import { Documento } from './documento.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface DocumentosState extends EntityState<Documento>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'documentos' })
export class DocumentosStore extends EntityStore<DocumentosState> {

  constructor() {
    super();
  }

}

