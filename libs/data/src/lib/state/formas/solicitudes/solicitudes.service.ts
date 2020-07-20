import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { SolicitudesStore } from './solicitudes.store';
import { Solicitud } from './solicitud.model';
import { tap } from 'rxjs/operators';
import {
  FeathersState,
  FeathersService,
  ServiceModel,
} from '@alliax/feathers-client';
import { SolicitudesQuery } from './solicitudes.query';

@Injectable({ providedIn: 'root' })
export class SolicitudesService extends FeathersState<
  Solicitud,
  SolicitudesStore
> {
  constructor(
    protected solicitudesStore: SolicitudesStore,
    feathersService: FeathersService
  ) {
    super(
      solicitudesStore,
      feathersService,
      new ServiceModel('formas-solicitudes')
    );
  }

  setBusqueda(termino) {
    this.solicitudesStore.update((state) => ({
      ...state,
      ui: {
        busqueda: termino,
      },
    }));
  }

  setSolicitudesActivas(clave) {
    this.solicitudesStore.update((state) => ({
      ...state,
      ui: {
        tipoSeleccionado: clave,
      },
    }));
  }
}
