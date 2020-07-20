import { Component, OnInit } from '@angular/core';
import {
  ExpedientesQuery,
  ExpedientesService,
} from '@indelpro-contraloria/data';
import { LoadingController, ToastController } from '@ionic/angular';
import { FeathersService } from '@alliax/feathers-client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'indelpro-contraloria-detalle-expediente',
  templateUrl: './detalle-expediente.page.html',
  styleUrls: ['./detalle-expediente.page.scss'],
})
export class DetalleExpedientePage implements OnInit {
  expedienteId: string;
  activo: any;
  rows: any[] = [];
  columns = [
    { name: 'Factura adjunta' },
    { name: 'Fecha de pago', prop: 'AUGDT' },

    { name: 'Concepto', prop: 'SGTXT' },
    { name: 'BELNR', prop: 'BELNR' },
    { name: 'Fecha factura SAP', prop: 'BUDAT' },
    { name: 'DMBE2', prop: 'DMBE2' },
    { name: 'DMBT1', prop: 'DMBT1' },
    { name: 'EBELN', prop: 'EBELN' },
    { name: 'EBELP', prop: 'EBELP' },
    { name: 'KZKRS', prop: 'KZKRS' },
    { name: 'Clave proveedor', prop: 'LIFNR' },
    { name: 'Nombre proveedor', prop: 'NAME1' },
    { name: 'País', prop: 'PAIS' },
    { name: 'Pedimento', prop: 'PEDIMENTO' },
    { name: 'SHKZG', prop: 'SHKZG' },
    { name: 'Moneda', prop: 'WAERS' },
    { name: 'WRBT1', prop: 'WRBT1' },
    { name: 'ZADUANA', prop: 'ZADUANA' },
    { name: 'ZFCHPAGO', prop: 'ZFCHPAGO' },
    { name: 'ZPATENTE', prop: 'ZPATENTE' },
    { name: 'ZPEDIMIENTO', prop: 'ZPEDIMIENTO' },
    { name: 'ZUONR', prop: 'ZUONR' },
  ];
  /*

   <ion-item>
                <ion-chip slot="end" color="secondary">
                  {{detalle.DMBT1 | currency}} USD /&nbsp;
                  <strong
                    >{{detalle.WRBT1 | currency}} {{detalle.WAERS}}</strong
                  >
                </ion-chip>
              </ion-item>

   */

  constructor(
    private active: ActivatedRoute,
    private expedientesQuery: ExpedientesQuery,
    private expedientesService: ExpedientesService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService
  ) {}

  async ngOnInit() {
    const cargando = await this.loadingCtrl.create({
      message: 'Cargando detalles del expediente',
    });
    await cargando.present();

    this.expedienteId = this.active.snapshot.paramMap.get('expedienteId');
    this.feathersService
      .service('expedientes-sap')
      .get(this.expedienteId)
      .then((datos) => {
        this.activo = datos;
        this.rows = datos.DET;
        console.log(datos);
        cargando.dismiss();
      });
  }
}
