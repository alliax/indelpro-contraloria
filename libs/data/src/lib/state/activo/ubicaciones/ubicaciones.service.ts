import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Ubicacion } from './ubicacion.model';
import { UbicacionesStore } from './ubicaciones.store';
import {
  FeathersService,
  FeathersState,
  ServiceModel,
} from '@alliax/feathers-client';
import { TipoActivo } from '@indelpro-contraloria/data';
import { TipoActivosStore } from '../tipo-activos/tipo-activos.store';

@Injectable({ providedIn: 'root' })
export class UbicacionesService extends FeathersState<
  Ubicacion,
  UbicacionesStore
> {
  constructor(
    protected ubicacionesStore: UbicacionesStore,
    feathersService: FeathersService
  ) {
    super(
      ubicacionesStore,
      feathersService,
      new ServiceModel('activo/ubicaciones')
    );
  }
}
