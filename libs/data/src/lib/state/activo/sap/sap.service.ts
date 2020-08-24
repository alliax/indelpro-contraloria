import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Sap } from './sap.model';
import { SapStore } from './sap.store';
import {
  FeathersService,
  FeathersState,
  ServiceModel,
} from '@alliax/feathers-client';
import { Expediente } from '@indelpro-contraloria/data';
import { ExpedientesStore } from '../expendientes/expedientes.store';

@Injectable({ providedIn: 'root' })
export class SapService extends FeathersState<Sap, SapStore> {
  constructor(protected sapStore: SapStore, feathersService: FeathersService) {
    super(sapStore, feathersService, new ServiceModel('sap-settings'));
  }
}
