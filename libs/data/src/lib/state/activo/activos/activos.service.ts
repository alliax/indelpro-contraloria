import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Activo } from './activo.model';
import { ActivosStore } from './activos.store';
import {
  FeathersService,
  FeathersState,
  ServiceModel,
} from '@alliax/feathers-client';
import { Expediente } from '@indelpro-contraloria/data';
import { ExpedientesStore } from '../expendientes/expedientes.store';

@Injectable({ providedIn: 'root' })
export class ActivosService extends FeathersState<Activo, ActivosStore> {
  constructor(
    protected activosStore: ActivosStore,
    feathersService: FeathersService
  ) {
    super(activosStore, feathersService, new ServiceModel('activos'));
  }

  cambiarPagina(cantidad: number) {
    this.activosStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        page: state.ui.page + cantidad,
      },
    }));
  }
  setPage(page: number) {
    this.activosStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        page,
      },
    }));
  }
  setLimit(limit: number) {
    this.activosStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        limit,
      },
    }));
  }
  setUltimaActualizacion(registros: number) {
    this.activosStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        ultimaActualizacion: registros,
      },
    }));
  }
  actualizaFecha(nuevaFecha: Date) {
    this.activosStore.update((state) => ({
      ...state,
      ui: {
        ...state.ui,
        fecha: nuevaFecha,
      },
    }));
  }

  setFiltro() {

  }

  setDetalle() {

  }
}
