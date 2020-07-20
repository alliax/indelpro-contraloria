import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  Activo,
  ActivosQuery,
  Expediente,
  ExpedientesQuery,
  TipoActivo,
  TipoActivosQuery,
} from '@indelpro-contraloria/data';
import { map, tap } from 'rxjs/operators';

export interface DashboardElement {
  tipoActivo: TipoActivo;
  valor: number;
  activos: number;
}

@Component({
  selector: 'indelpro-contraloria-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  dashboard$: Observable<DashboardElement[]> = combineLatest([
    this.activosQuery.selectAll(),
    this.tipoActivosQuery.selectAll(),
  ]).pipe(
    map((values) => {
      const activos = values[0];
      const tipos = values[1];

      return tipos.map((tipo) => ({
        tipoActivo: { ...tipo },
        valor: activos
          .filter((activo) => activo.ANLKL.toString() === tipo.claveSap)
          .map((activo) => activo.KANSW)
          .reduce((acc, curr) => (acc += curr)),
        activos: activos.filter(
          (activo) => activo.ANLKL.toString() === tipo.claveSap
        ).length,
      }));
    })
  );
  agrupadoValor$ = this.dashboard$.pipe(
    map((grupos) =>
      grupos.map((grupo) => grupo.valor).reduce((acc, curr) => (acc += curr), 0)
    )
  );
  agrupadoTotal$ = this.dashboard$.pipe(
    map((grupos) =>
      grupos
        .map((grupo) => grupo.activos)
        .reduce((acc, curr) => (acc += curr), 0)
    )
  );

  constructor(
    private expedientesQuery: ExpedientesQuery,
    private activosQuery: ActivosQuery,
    private tipoActivosQuery: TipoActivosQuery
  ) {}

  ngOnInit() {}
}
