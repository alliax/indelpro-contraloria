import { Component, OnInit } from '@angular/core';
import {
  ExpedientesService,
  ExpedientesQuery,
  Expediente,
  SapQuery,
} from '@indelpro-contraloria/data';
import { ToastController, LoadingController } from '@ionic/angular';
import { FeathersService } from '@alliax/feathers-client';
import { ActivosService } from '@indelpro-contraloria/data';
import { ActivosQuery } from '@indelpro-contraloria/data';

@Component({
  selector: 'indelpro-contraloria-expedientes',
  templateUrl: './expedientes.page.html',
  styleUrls: ['./expedientes.page.scss'],
})
export class ExpedientesPage implements OnInit {
  expedientesTotal$ = this.expedientesQuery.total$;
  expedientesUltima$ = this.expedientesQuery.ultimaActualizacion$;

  activosTotal$ = this.activosQuery.total$;
  activosUltima$ = this.activosQuery.ultimaActualizacion$;

  constructor(
    private expedientesQuery: ExpedientesQuery,
    private expedientesService: ExpedientesService,
    private activosQuery: ActivosQuery,
    private activosService: ActivosService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService,
    private sapQuery: SapQuery
  ) {}

  ngOnInit() {}

  async actualizaExpedientes() {
    const expedientes = await this.feathersService
      .service('expedientes-sap')
      .find();
    await this.expedientesService.setUltimaActualizacion(expedientes.length);
  }
  async actualizaActivos() {
    const activos = await this.feathersService.service('activos-sap').find();
    await this.activosService.setUltimaActualizacion(activos.length);
  }

  async actualizar() {
    const actualizando = await this.loadingCtrl.create({
      message: 'Actualizando elementos PEP y activos',
    });
    await actualizando.present();

    try {
      await this.expedientesService.reset();
      await this.activosService.reset();

      await Promise.all([this.actualizaExpedientes(), this.actualizaActivos()]);
      const sapActivo = this.sapQuery
        .getAll()
        .find((sap) => sap.activo === true);

      await this.expedientesService.load({ sapId: sapActivo._id });
      await this.activosService.load({ sapId: sapActivo._id });
      const success = await this.toastCtrl.create({
        message: 'Se actualizaron exitosamente los elementos PEP y activos',
        duration: 4000,
        color: 'success',
      });
      await success.present();
    } catch (err) {
      console.error(err);
      const errorToast = await this.toastCtrl.create({
        message:
          'Ocurrió un error al actualizar la información de los elementos PEP y activos',
        duration: 4000,
        color: 'danger',
      });
      await errorToast.present();
    } finally {
      await actualizando.dismiss();
    }
  }
}
