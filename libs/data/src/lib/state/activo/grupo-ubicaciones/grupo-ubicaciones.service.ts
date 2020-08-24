import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { GrupoUbicacion } from './grupo-ubicacion.model';
import { GrupoUbicacionesStore } from './grupo-ubicaciones.store';
import {
  FeathersService,
  FeathersState,
  ServiceModel,
} from '@alliax/feathers-client';
import { TipoActivo } from '@indelpro-contraloria/data';
import { TipoActivosStore } from '../tipo-activos/tipo-activos.store';

@Injectable({ providedIn: 'root' })
export class GrupoUbicacionesService extends FeathersState<
  GrupoUbicacion,
  GrupoUbicacionesStore
> {
  constructor(
    protected grupoUbicacionesStore: GrupoUbicacionesStore,
    feathersService: FeathersService
  ) {
    super(
      grupoUbicacionesStore,
      feathersService,
      new ServiceModel('activo/grupo-ubicaciones')
    );
  }
}
