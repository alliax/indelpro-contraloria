import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UsuariosStore, UsuariosState } from './usuarios.store';

@Injectable({ providedIn: 'root' })
export class UsuariosQuery extends QueryEntity<UsuariosState> {

  constructor(protected store: UsuariosStore) {
    super(store);
  }

}
