import { Injectable } from '@angular/core';
import { ExpedientesStore, ExpedientesState } from './expedientes.store';
import { Service } from '@feathersjs/feathers';
import {
  FeathersService,
  ServiceModel,
  FeathersState,
} from '@alliax/feathers-client';
import { Expediente } from './expediente.model';

@Injectable({ providedIn: 'root' })
export class ExpedientesService extends FeathersState<
  Expediente,
  ExpedientesStore
> {
  constructor(
    protected expedientesStore: ExpedientesStore,
    feathersService: FeathersService
  ) {
    super(expedientesStore, feathersService, new ServiceModel('expedientes'));
  }

  cambiarActivo(id) {
    this.expedientesStore.setActive(id);
  }

  cambiarPagina(cantidad: number) {
    this.expedientesStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        page: state.ui.page + cantidad,
      },
    }));
  }
  setPage(page: number) {
    this.expedientesStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        page,
      },
    }));
  }
  setLimit(limit: number) {
    this.expedientesStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        limit,
      },
    }));
  }
  setUltimaActualizacion(registros: number) {
    this.expedientesStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        ultimaActualizacion: registros,
      },
    }));
  }
}
