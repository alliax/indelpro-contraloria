import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { TipoActivo } from './tipo-activo.model';
import { TipoActivosStore } from './tipo-activos.store';
import {
  FeathersService,
  FeathersState,
  ServiceModel,
} from '@alliax/feathers-client';

@Injectable({ providedIn: 'root' })
export class TipoActivosService extends FeathersState<
  TipoActivo,
  TipoActivosStore
> {
  constructor(
    protected activoStore: TipoActivosStore,
    feathersService: FeathersService
  ) {
    super(
      activoStore,
      feathersService,
      new ServiceModel('activo/tipo-activos')
    );
  }
}
