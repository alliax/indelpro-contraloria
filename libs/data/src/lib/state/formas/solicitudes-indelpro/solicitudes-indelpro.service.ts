import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { SolicitudesIndelpro } from './solicitudes-indelpro.model';
import { SolicitudesIndelproStore } from './solicitudes-indelpro.store';

@Injectable({ providedIn: 'root' })
export class SolicitudesIndelproService {

  constructor(private solicitudesIndelproStore: SolicitudesIndelproStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<SolicitudesIndelpro[]>('https://api.com').pipe(tap(entities => {
      this.solicitudesIndelproStore.set(entities);
    }));
  }

  add(solicitudesIndelpro: SolicitudesIndelpro) {
    this.solicitudesIndelproStore.add(solicitudesIndelpro);
  }

  update(id, solicitudesIndelpro: Partial<SolicitudesIndelpro>) {
    this.solicitudesIndelproStore.update(id, solicitudesIndelpro);
  }

  remove(id: ID) {
    this.solicitudesIndelproStore.remove(id);
  }

}
