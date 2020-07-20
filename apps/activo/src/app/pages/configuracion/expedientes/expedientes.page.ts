import { Component, OnInit } from '@angular/core';
import {
  ExpedientesService,
  ExpedientesQuery,
  Expediente,
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
    private feathersService: FeathersService
  ) {}

  ngOnInit() {}

  async actualizar() {
    const actualizando = await this.loadingCtrl.create({
      message: 'Actualizando elementos PEP y activos',
    });
    await actualizando.present();

    try {
      const expedientes = await this.feathersService
        .service('expedientes-sap')
        .find({ paginate: false });
      const activos = await this.feathersService
        .service('activos-sap')
        .find({ paginate: false });
      await this.expedientesService.setUltimaActualizacion(expedientes.length);
      await this.activosService.setUltimaActualizacion(activos.length);
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
    }
    await actualizando.dismiss();
  }
}
