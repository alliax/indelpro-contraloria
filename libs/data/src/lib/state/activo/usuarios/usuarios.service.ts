import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { UsuariosStore } from './usuarios.store';
import { Usuario } from './usuario.model';
import { tap } from 'rxjs/operators';
import { Service } from '@feathersjs/feathers';
import { FeathersService } from '@alliax/feathers-client';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  service: Service<Usuario> = this.feathersService.service('users');

  constructor(
    protected store: UsuariosStore,
    private feathersService: FeathersService
  ) {}

  load() {
    this.service
      .watch()
      .find({
        query: {
          $sort: {
            nombre: 1
          }
        }
      })
      .subscribe(data => this.store.set(data));
  }

  // get() {}

  // add(usuario: Usuario) {}

  // update(id, usuario: Partial<Usuario>) {}

  // remove(id: ID) {}
}
