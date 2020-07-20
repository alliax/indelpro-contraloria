import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TiposStore } from './tipos.store';
import { Tipo } from './tipo.model';
import { tap } from 'rxjs/operators';
import {
  FeathersState,
  FeathersService,
  ServiceModel,
} from '@alliax/feathers-client';

@Injectable({ providedIn: 'root' })
export class TiposService extends FeathersState<Tipo, TiposStore> {
  constructor(
    private tiposStore: TiposStore,
    feathersService: FeathersService
  ) {
    super(tiposStore, feathersService, new ServiceModel('formas-tipos'));
  }
}
