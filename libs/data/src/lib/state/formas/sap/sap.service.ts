import { Injectable } from '@angular/core';
import { SapFormas } from './sap.model';
import { SapFormasStore } from './sap.store';
import {
  FeathersService,
  FeathersState,
  ServiceModel,
} from '@alliax/feathers-client';

@Injectable({ providedIn: 'root' })
export class SapFormasService extends FeathersState<SapFormas, SapFormasStore> {
  constructor(
    protected sapStore: SapFormasStore,
    feathersService: FeathersService
  ) {
    super(sapStore, feathersService, new ServiceModel('formas/sap'));
  }
}
