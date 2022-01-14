import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  Activo,
  ActivosQuery,
  ActivosService,
  ExpedientesQuery,
  GrupoActivo,
  TipoActivo,
  TipoActivosQuery
} from '@indelpro-contraloria/data';
import { map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { DetalleActivosPage } from '../detalle-activos/detalle-activos.page';

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
  fechaSeleccionada$: Observable<string> = this.activosQuery.fechaSeleccionada$;
  loading$: Observable<boolean> = this.activosQuery.selectLoading();
  dashboard$: Observable<DashboardElement[]> = combineLatest([
    this.activosQuery.selectAll(),
    this.tipoActivosQuery.selectAll(),
    this.activosQuery.fechaSeleccionada$,
  ]).pipe(
    map((values) => {
      const activos = values[0];
      const tipos = values[1];
      const fecha = values[2];

      return tipos.map((tipo) => {
        console.log(activos);

        const filtrados = activos.filter((activo) =>
          tipo.claveSap === 'PROCESO'
            ? !activo.ANLKL
            : activo.ANLKL.toString() === tipo.claveSap &&
              new Date(activo.AKTIV).valueOf() <=
                new Date(String(fecha)).valueOf()
        );
        return {
          tipoActivo: { ...tipo },
          valor: filtrados
            .map((activo) => activo.KANSW)
            .reduce((acc, curr) => (acc += curr), 0),
          registros: filtrados,
          activos: filtrados.length,
        };
      });
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
    private tipoActivosQuery: TipoActivosQuery,
    private activosService: ActivosService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  cambiaFecha($event: any) {
    if ($event.target.value) {
      this.activosService.actualizaFecha(new Date($event.target.value));
    }
  }

  async verDetalle(grupo: GrupoActivo) {
    grupo.registros = grupo.registros.sort(
      (a, b) => new Date(b.AKTIV).valueOf() - new Date(a.AKTIV).valueOf()
    );
    const detalle = await this.modalCtrl.create({
      component: DetalleActivosPage,
      componentProps: {
        grupo,
      },
    });
    await detalle.present();
  }
}
