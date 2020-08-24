import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { UsuariosStore } from './usuarios.store';
import { Usuario } from './usuario.model';
import { tap } from 'rxjs/operators';
import { Service } from '@feathersjs/feathers';
import {
  FeathersService,
  FeathersState,
  ServiceModel,
} from '@alliax/feathers-client';
import { TipoActivosStore } from '../tipo-activos/tipo-activos.store';

@Injectable({ providedIn: 'root' })
export class UsuariosService extends FeathersState<Usuario, UsuariosStore> {
  constructor(
    protected usuariosStore: UsuariosStore,
    feathersService: FeathersService
  ) {
    super(usuariosStore, feathersService, new ServiceModel('users'));
  }
}
