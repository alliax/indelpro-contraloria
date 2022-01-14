import { Injectable } from '@angular/core';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { Activo } from './activo.model';
import { Expediente } from '@indelpro-contraloria/data';

export interface ActivosState extends EntityState<Activo>, ActiveState {
  ui: {
    page?: number;
    limit?: number;
    ultimaActualizacion?: number;
    activo?: Activo;
    fecha?: Date;
    listaDetalle?: Activo[];
    filtroDetalle?: string;
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'activos', idKey: '_id', resettable: true })
export class ActivosStore extends EntityStore<ActivosState> {
  constructor() {
    super({
      ui: {
        page: 1,
        limit: 10,
        ultimaActualizacion: 0,
        fecha: new Date(),
      },
    });
  }
}
