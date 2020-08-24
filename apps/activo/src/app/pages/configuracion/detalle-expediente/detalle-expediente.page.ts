import { Component, OnInit } from '@angular/core';
import {
  Expediente,
  ExpedienteDet,
  ExpedienteHeader,
  ExpedientesQuery,
  ExpedientesService,
} from '@indelpro-contraloria/data';
import { LoadingController, ToastController } from '@ionic/angular';
import { FeathersService } from '@alliax/feathers-client';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Adjunto } from '@indelpro-contraloria/data';

@Component({
  selector: 'indelpro-contraloria-detalle-expediente',
  templateUrl: './detalle-expediente.page.html',
  styleUrls: ['./detalle-expediente.page.scss'],
})
export class DetalleExpedientePage implements OnInit {
  expedienteId: string;
  activo: any;
  rows: any[] = [];
  detalleVisible = false;
  autorizacionVisible = false;
  capitalizacionVisible = false;
  actualizandoSap = false;
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

  cargando$: Observable<boolean> = this.expedientesQuery.selectLoading();
  expediente$: Observable<Expediente> = this.active.paramMap.pipe(
    map((paramsMap: ParamMap) => paramsMap.get('expedienteId')),
    filter((_id) => !!_id),
    switchMap((_id: string) =>
      this.expedientesQuery.selectEntity(_id).pipe(
        filter((expediente) => !!expediente),
        tap(async (expediente: Expediente) => {
          this.rows = expediente.DET;
          this.actualizandoSap = true;
          try {
            // await this.feathersService.service('expedientes-sap').get(_id);
            await (
              await this.toastCtrl.create({
                message: 'Se actualizó correctamente el registro desde SAP',
                color: 'success',
                duration: 4500,
              })
            ).present();
          } catch (err) {
            await (
              await this.toastCtrl.create({
                message:
                  'Ocurrió un error al actualizar el expedientes desde SAP',
                color: 'danger',
                duration: 4500,
              })
            ).present();
          } finally {
            this.actualizandoSap = false;
          }
        })
      )
    )
  );

  fotos$: Observable<Adjunto[]> = this.expediente$.pipe(
    map((expediente: Expediente) => expediente.fotos)
  );
  header$: Observable<ExpedienteHeader> = this.expediente$.pipe(
    map((expediente: Expediente) => expediente.HEADER)
  );
  det$: Observable<ExpedienteDet[]> = this.expediente$.pipe(
    map((expediente: Expediente) => expediente.DET)
  );

  constructor(
    private active: ActivatedRoute,
    private expedientesQuery: ExpedientesQuery,
    private expedientesService: ExpedientesService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService
  ) {}

  async ngOnInit() {}
}
