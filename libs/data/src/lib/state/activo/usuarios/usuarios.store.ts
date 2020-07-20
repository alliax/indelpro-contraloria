import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface UsuariosState extends EntityState<Usuario> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'usuarios', idKey: '_id' })
export class UsuariosStore extends EntityStore<UsuariosState> {
  constructor() {
    super();
  }
}
