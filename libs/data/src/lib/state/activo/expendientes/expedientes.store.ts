import { Injectable } from '@angular/core';
import { Expediente } from './expediente.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export interface ExpedientesState extends EntityState<Expediente>, ActiveState {
  ui: {
    page?: number;
    limit?: number;
    ultimaActualizacion?: number;
    activo?: Expediente;
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'expedientes', idKey: '_id', resettable: true })
export class ExpedientesStore extends EntityStore<ExpedientesState> {
  constructor() {
    super({
      ui: {
        page: 1,
        limit: 10,
        ultimaActualizacion: 0,
      },
    });
  }
}
