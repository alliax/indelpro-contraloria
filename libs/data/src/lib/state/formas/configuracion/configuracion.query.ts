import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ConfiguracionStore, ConfiguracionState } from './configuracion.store';
import { Observable } from 'rxjs';
import { Configuracion } from './configuracion.model';
import { map } from 'rxjs/operators';
import { Sap } from '../../activo/sap/sap.model';

@Injectable({ providedIn: 'root' })
export class ConfiguracionQuery extends QueryEntity<ConfiguracionState> {
  activa$: Observable<Configuracion> = this.selectAll().pipe(
    map((configuraciones) =>
      configuraciones.find((configuracion) => configuracion.activo === true)
    )
  );

  constructor(protected store: ConfiguracionStore) {
    super(store);
  }
}
