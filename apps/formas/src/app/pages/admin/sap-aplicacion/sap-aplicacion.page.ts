import { Component, OnInit } from '@angular/core';
import { DataEntryClass, FeathersService } from '@alliax/feathers-client';
import {
  Configuracion,
  ConfiguracionQuery,
  ConfiguracionService,
  createConfiguracion,
  FormasStateService,
  SapFormas,
  SapFormasQuery,
} from '@indelpro-contraloria/data';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import {
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  startWith,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-sap-aplicacion',
  templateUrl: './sap-aplicacion.page.html',
  styleUrls: ['./sap-aplicacion.page.scss'],
})
export class SapAplicacionPage
  extends DataEntryClass<Configuracion, ConfiguracionService>
  implements OnInit {
  registros$ = this.configuracionQuery.selectAll();
  sapActivo$ = this.configuracionQuery.activa$.pipe(
    filter((val) => !!val),
    distinctUntilKeyChanged('_id'),
    startWith((val) => null)
  );

  sapsSelect$ = this.sapFormasQuery.selectAll().pipe(
    map((saps) =>
      saps.map((sap) => ({
        value: sap._id,
        label: sap.nombre,
      }))
    )
  );

  model = createConfiguracion({});
  fields = [
    {
      key: '_id',
      type: 'input',
      className: 'form-hidden',
      templateOptions: {
        type: 'hidden',
      },
    },
    {
      key: 'nombre',
      type: 'input',
      templateOptions: {
        label: 'Nombre para la configuración',
        placeholder: 'Ingresa un nombre',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar el nombre',
        },
      },
    },
    {
      key: 'sapSrmId',
      type: 'select',
      templateOptions: {
        label: 'SAP para SRM',
        placeholder: 'Selecciona una opción',
        labelPosition: 'stacked',
        required: true,
        options: this.sapsSelect$,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'sapComprasId',
      type: 'select',
      templateOptions: {
        label: 'SAP para Compras',
        placeholder: 'Selecciona una opción',
        labelPosition: 'stacked',
        required: true,
        options: this.sapsSelect$,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'sapIndelproId',
      type: 'select',
      templateOptions: {
        label: 'SAP Indelpro',
        placeholder: 'Selecciona una opción',
        labelPosition: 'stacked',
        required: true,
        options: this.sapsSelect$,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'url',
      type: 'input',
      templateOptions: {
        label: 'URL para archivos',
        placeholder: 'Ingresa la URL',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
  ];

  constructor(
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected feathersService: FeathersService,
    private configuracionQuery: ConfiguracionQuery,
    private configuracionService: ConfiguracionService,
    private sapFormasQuery: SapFormasQuery,
    private formasStateService: FormasStateService
  ) {
    super(
      loadingCtrl,
      toastCtrl,
      alertCtrl,
      configuracionService,
      feathersService
    );
  }

  ngOnInit() {}

  async cambiaActiva($event: any) {
    const configuracion: Configuracion = { ...$event.target.value };
    if (configuracion.activo !== true) {
      configuracion.activo = true;
      await this.configuracionService.update(configuracion);
      await this.formasStateService.cambiaSapSettings(configuracion._id);
    }
  }

  compareSap(o1, o2) {
    return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }
}
