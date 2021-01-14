import { Injectable } from '@angular/core';
import { Configuracion } from './configuracion.model';
import { ConfiguracionStore } from './configuracion.store';
import {
  FeathersService,
  FeathersState,
  ServiceModel,
} from '@alliax/feathers-client';

@Injectable({ providedIn: 'root' })
export class ConfiguracionService extends FeathersState<
  Configuracion,
  ConfiguracionStore
> {
  constructor(
    protected configuracionStore: ConfiguracionStore,
    feathersService: FeathersService
  ) {
    super(
      configuracionStore,
      feathersService,
      new ServiceModel('formas/configuracion')
    );
  }
}
