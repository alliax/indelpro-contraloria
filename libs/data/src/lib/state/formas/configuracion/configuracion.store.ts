import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';
import { Configuracion } from './configuracion.model';

export interface ConfiguracionState
  extends EntityState<Configuracion>,
    ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'configuracion', idKey: '_id' })
export class ConfiguracionStore extends EntityStore<ConfiguracionState> {
  constructor() {
    super();
  }
}
