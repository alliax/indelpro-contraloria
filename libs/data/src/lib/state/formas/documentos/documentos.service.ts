import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { DocumentosStore } from './documentos.store';
import { Documento } from './documento.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DocumentosService {

  constructor(private documentosStore: DocumentosStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get<Documento[]>('https://api.com').pipe(tap(entities => {
      this.documentosStore.set(entities);
    }));
  }

  add(documento: Documento) {
    this.documentosStore.add(documento);
  }

  update(id, documento: Partial<Documento>) {
    this.documentosStore.update(id, documento);
  }

  remove(id: ID) {
    this.documentosStore.remove(id);
  }
}
