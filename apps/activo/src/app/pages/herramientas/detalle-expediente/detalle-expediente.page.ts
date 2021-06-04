import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  Activo,
  Expediente,
  ExpedienteActRel,
  ExpedienteDet,
  ExpedienteHeader,
  ExpedientesQuery,
  ExpedientesService,
  UbicacionesQuery,
} from '@indelpro-contraloria/data';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import {
  AuthQuery,
  DataEntryClass,
  FeathersService,
  User,
} from '@alliax/feathers-client';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Adjunto } from '@indelpro-contraloria/data';
import { CurrencyPipe } from '@angular/common';
import { TableColumn } from '@swimlane/ngx-datatable';
import { json2csvAsync } from 'json-2-csv';
import { FacturasExpedientePage } from '../facturas-expediente/facturas-expediente.page';

@Component({
  selector: 'indelpro-contraloria-detalle-expediente',
  templateUrl: './detalle-expediente.page.html',
  styleUrls: ['./detalle-expediente.page.scss'],
})
export class DetalleExpedientePage
  extends DataEntryClass<Expediente, ExpedientesService>
  implements OnInit
{
  @ViewChild('fotografias') fotografias: HTMLIonSlidesElement;
  @ViewChild('archivosAdjuntos') archivosAdjuntos: TemplateRef<any>;
  detalleVisible = false;
  autorizacionVisible = false;
  capitalizacionVisible = false;
  actualizandoSap = false;
  columns: TableColumn[];

  fotosSubir: File[];
  autorizacion: File[];
  capitalizacion: File[];

  ubicaciones$ = this.ubicacionesQuery.agrupadas$;

  isAdmin$: Observable<boolean> = this.authQuery.selectUser$.pipe(
    map((user: User) => user.role.includes('admin'))
  );

  cargando$: Observable<boolean> = this.expedientesQuery.selectLoading();

  expediente$: Observable<Expediente> = this.expedientesQuery
    .selectActive()
    .pipe(filter((expediente) => !!expediente));

  /*expediente$: Observable<Expediente> = this.active.paramMap.pipe(
    map((params: ParamMap) => params.get('expedienteId')),
    filter((id) => !!id),
    switchMap((_id: string) =>
      this.expedientesQuery
        .selectEntity(_id)
        .pipe(filter((expediente) => !!expediente))
    )
  );*/

  fotos$: Observable<Adjunto[]> = this.expediente$.pipe(
    map((expediente: Expediente) => expediente.fotos)
  );
  header$: Observable<ExpedienteHeader> = this.expediente$.pipe(
    map((expediente: Expediente) => expediente.HEADER)
  );
  det$: Observable<ExpedienteDet[]> = this.expediente$.pipe(
    map((expediente: Expediente) =>
      expediente.DET
        ? expediente.DET.map((detalle: ExpedienteDet) => ({
            ...detalle,
            DMBE2: detalle.SHKZG === 'H' ? detalle.DMBE2 * -1 : detalle.DMBE2,
            WRBT1: detalle.SHKZG === 'H' ? detalle.WRBT1 * -1 : detalle.WRBT1,
          }))
        : []
    )
  );
  activos$: Observable<ExpedienteActRel[]> = this.expediente$.pipe(
    map((expediente: Expediente) => expediente.ACT_REL)
  );

  muestraSiguiente = false;
  muestraAnterior = false;

  constructor(
    private active: ActivatedRoute,
    private expedientesQuery: ExpedientesQuery,
    private expedientesService: ExpedientesService,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    private feathersService: FeathersService,
    private authQuery: AuthQuery,
    private ubicacionesQuery: UbicacionesQuery,
    private currencyPipe: CurrencyPipe,
    public modalCtrl: ModalController
  ) {
    super(
      loadingCtrl,
      toastCtrl,
      alertCtrl,
      expedientesService,
      feathersService
    );
  }

  async rowActivated(event) {
    if (event.type === 'click') {
      const facturas = await this.modalCtrl.create({
        component: FacturasExpedientePage,
        componentProps: {
          expediente: event.row,
        },
      });
      await facturas.present();
    }
  }

  async ngOnInit() {
    this.columns = [
      {
        name: 'Fecha de pago',
        prop: 'AUGDT',
        summaryFunc: null,
        pipe: {
          transform: function (value: any, ...args): any {
            if (value) {
              const fecha = new Date(
                value.toString().substring(0, 4) +
                  '-' +
                  value.toString().substring(4, 6) +
                  '-' +
                  value.toString().substring(6, 8)
              );
              return fecha.toLocaleDateString('es-MX', {});
            }
          },
        },
      },
      { name: 'Concepto', prop: 'SGTXT', summaryFunc: null },
      { name: 'Doc. Contable', prop: 'BELNR', summaryFunc: null },
      {
        name: 'Fecha factura SAP',
        prop: 'BUDAT',
        summaryFunc: null,
        pipe: {
          transform: function (value: any, ...args): any {
            if (value) {
              const fecha = new Date(
                value.toString().substring(0, 4) +
                  '-' +
                  value.toString().substring(4, 6) +
                  '-' +
                  value.toString().substring(6, 8)
              );
              return fecha.toLocaleDateString('es-MX', {});
            }
          },
        },
      },
      { name: 'Pedido', prop: 'EBELN', summaryFunc: null },
      {
        name: 'Inversion USD',
        prop: 'DMBE2',
        // pipe: new CurrencyPipe('en-US'),
        pipe: {
          transform(value: any, ...args): any {
            const cP = new CurrencyPipe('en-US');
            if (value.toString().includes('$')) return value;
            return cP.transform(value.toString());
          },
        },
      },
      {
        name: 'Inversion Pesos',
        prop: 'WRBT1',
        pipe: {
          transform(value: any, ...args): any {
            const cP = new CurrencyPipe('en-US');
            if (value.toString().includes('$')) return value;
            return cP.transform(value.toString());
          },
        },
      },
      {
        name: 'Tipo de Cambio',
        prop: 'KZKRS',
        summaryFunc: null,
        pipe: {
          transform(value: any, ...args): any {
            if (value) {
              const cP = new CurrencyPipe('en-US');
              if (value.toString().includes('$')) return value;
              return cP.transform(value.toString());
            }
          },
        },
      },
      { name: 'Moneda', prop: 'WAERS', summaryFunc: null },
      { name: 'Clave proveedor', prop: 'LIFNR', summaryFunc: null },
      { name: 'Nombre proveedor', prop: 'NAME1', summaryFunc: null },
      { name: 'País', prop: 'PAIS', summaryFunc: null },
      { name: 'Pedimento', prop: 'PEDIMENTO', summaryFunc: null },
      { name: 'Cve. Aduana', prop: 'ZADUANA', summaryFunc: null },
      { name: 'Fecha Pago Pat.', prop: 'ZFCHPAGO', summaryFunc: null },
      { name: 'No. Patente', prop: 'ZPATENTE', summaryFunc: null },
      /*{ name: 'Pedimento', prop: 'ZPEDIMENTO', summaryFunc: null },*/
      { name: 'Asignacion', prop: 'ZUONR', summaryFunc: null },

      /*{ name: 'Inversion segunda moneda', prop: 'DMBE2' },*/
      /*{ name: 'EBELP', prop: 'EBELP' },*/
      /*{ name: 'Indicador debe/haber signo', prop: 'SHKZG' },*/
    ];
    const id = this.active.snapshot.paramMap.get('expedienteId');
    this.expedientesService.cambiarActivo(id);
    this.actualizandoSap = true;
    try {
      const registro: Expediente = await this.feathersService
        .service('expedientes-sap')
        .get(id);
      await (
        await this.toastCtrl.create({
          message: `Se actualizó correctamente el registro ${registro.PROJK} desde SAP`,
          color: 'success',
          duration: 4500,
        })
      ).present();
    } catch (err) {
      await (
        await this.toastCtrl.create({
          message: 'Ocurrió un error al actualizar el expedientes desde SAP',
          color: 'danger',
          duration: 4500,
        })
      ).present();
    } finally {
      this.actualizandoSap = false;
    }
  }

  async revisaBotones(event) {
    this.muestraAnterior = !(await this.fotografias.isBeginning());
    this.muestraSiguiente = !(await this.fotografias.isEnd());
  }

  async actualizaUbicacion(expediente, event) {
    const actualizar: Expediente = JSON.parse(JSON.stringify(expediente));
    actualizar.ubicacionId = event.target.value;
    await super.update(actualizar);
  }

  async borrarFoto(expediente, foto) {
    const alerta = await this.alertCtrl.create({
      header: 'Eliminar foto',
      message: '¿Deseas eliminar la foto del expediente?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: async () => {
            const actualizar: Expediente = JSON.parse(
              JSON.stringify(expediente)
            );
            actualizar.fotosId = actualizar.fotosId.filter(
              (fotoExp) => fotoExp !== foto._id
            );
            await super.update(actualizar);
            const resp = await this.feathersService
              .service('activo/adjuntos')
              .remove(foto._id);
          },
        },
      ],
    });
    alerta.present();
  }

  async subirFoto(expediente: Expediente) {
    try {
      const actualizar = JSON.parse(JSON.stringify(expediente));

      for (const foto of this.fotosSubir) {
        actualizar.file = foto;
        const uploaded = await super.upload(actualizar, null);
        const adjunto = await this.feathersService
          .service('activo/adjuntos')
          .create({
            nombre: foto.name,
            archivo: uploaded.id,
            expedienteId: expediente._id,
          } as Adjunto);

        if (!actualizar.fotosId) {
          actualizar.fotosId = [];
        }
        actualizar.fotosId.push(adjunto._id);
        delete actualizar.file;
      }
      this.fotosSubir = [];
      return super.update(actualizar);
    } catch (err) {
      console.log(err);
    }
  }

  async slideNext() {
    await this.fotografias.slideNext();
  }
  async slideBack() {
    await this.fotografias.slidePrev();
  }
  async descargarDetalle(detalles: ExpedienteDet[]) {
    const csvData = await json2csvAsync(
      detalles.map((detalle: ExpedienteDet) => ({
        'Fecha de pago': detalle.AUGDT,
        Concepto: detalle.SGTXT,
        'Doc. Contable': detalle.BELNR,
        'Fecha factura SAP': detalle.BUDAT,
        Pedido: detalle.EBELN,
        'Inversion USD': detalle.DMBE2,
        'Inversion Pesos': detalle.WRBT1,
        'Tipo de Cambio': detalle.KZKRS,
        Moneda: detalle.WAERS,
        'Clave proveedor': detalle.LIFNR,
        'Nombre proveedor': detalle.NAME1,
        País: detalle.PAIS,
        Pedimento: detalle.PEDIMENTO,
        'Cve. Aduana': detalle.ZADUANA,
        'Fecha Pago Pat.': detalle.ZFCHPAGO,
        'No. Patente': detalle.ZPATENTE,
        Asignacion: detalle.ZUONR,
      })),
      { excelBOM: true }
    );

    const blob = new Blob([...csvData], {
      type: 'text/csv',
    });
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(
        blob,
        `DetalleExpediente-${new Date().toLocaleDateString()}`
      );
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = `DetalleExpediente-${new Date().toLocaleDateString()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
  async borrarAutorizacion(expediente, autorizacion) {
    const alerta = await this.alertCtrl.create({
      header: 'Eliminar archivo de autorización de proyecto',
      message: '¿Deseas eliminar el archivo adjunto?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: async () => {
            const actualizar: Expediente = JSON.parse(
              JSON.stringify(expediente)
            );
            actualizar.autorizacionProyectosId =
              actualizar.autorizacionProyectosId.filter(
                (autorizacionId) => autorizacionId !== autorizacion._id
              );
            await super.update(actualizar);
            const resp = await this.feathersService
              .service('activo/adjuntos')
              .remove(autorizacion._id);
          },
        },
      ],
    });
    alerta.present();
  }
  async subirAutorizacion(expediente: Expediente) {
    try {
      const actualizar = JSON.parse(JSON.stringify(expediente));

      for (const archivo of this.autorizacion) {
        actualizar.file = archivo;
        const uploaded = await super.upload(actualizar, null);
        const adjunto = await this.feathersService
          .service('activo/adjuntos')
          .create({
            nombre: archivo.name,
            archivo: uploaded.id,
            expedienteId: expediente._id,
          } as Adjunto);
        if (!actualizar.autorizacionProyectosId) {
          actualizar.autorizacionProyectosId = [];
        }
        actualizar.autorizacionProyectosId.push(adjunto._id);
        delete actualizar.file;
      }
      this.autorizacion = [];
      return super.update(actualizar);
    } catch (err) {
      console.log(err);
    }
  }
  async borrarCapitalizacion(expediente, capitalizacion) {
    const alerta = await this.alertCtrl.create({
      header: 'Eliminar archivo de autorización de capitalización',
      message: '¿Deseas eliminar el archivo adjunto?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: async () => {
            const actualizar: Expediente = JSON.parse(
              JSON.stringify(expediente)
            );
            actualizar.capitalizacionProyectosId =
              actualizar.capitalizacionProyectosId.filter(
                (capitalizacionId) => capitalizacionId !== capitalizacion._id
              );
            await super.update(actualizar);
            const resp = await this.feathersService
              .service('activo/adjuntos')
              .remove(capitalizacion._id);
          },
        },
      ],
    });
    alerta.present();
  }
  async subirCapitalizacion(expediente: Expediente) {
    try {
      const actualizar = JSON.parse(JSON.stringify(expediente));

      for (const archivo of this.capitalizacion) {
        actualizar.file = archivo;
        const uploaded = await super.upload(actualizar, null);
        const adjunto = await this.feathersService
          .service('activo/adjuntos')
          .create({
            nombre: archivo.name,
            archivo: uploaded.id,
            expedienteId: expediente._id,
          } as Adjunto);
        if (!actualizar.capitalizacionProyectosId) {
          actualizar.capitalizacionProyectosId = [];
        }
        actualizar.capitalizacionProyectosId.push(adjunto._id);
        delete actualizar.file;
      }
      this.capitalizacion = [];
      return super.update(actualizar);
    } catch (err) {
      console.log(err);
    }
  }
}
