import { Injectable } from '@angular/core';
import { Solicitud } from './solicitud.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export interface SolicitudesState extends EntityState<Solicitud>, ActiveState {
  ui: {
    busqueda?: string;
    tipoSeleccionado?: string;
    dashboard?: {
      pendientes?: {
        open?: boolean;
      };
      enviados?: {
        open?: boolean;
      };
    };
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'solicitudes', idKey: 'IDWFC' })
export class SolicitudesStore extends EntityStore<SolicitudesState> {
  constructor() {
    super({
      ui: {
        busqueda: null,
        tipoSeleccionado: null,
        dashboard: {
          pendientes: {
            open: false,
          },
          enviados: {
            open: false,
          },
        },
      },
    });
  }
}
