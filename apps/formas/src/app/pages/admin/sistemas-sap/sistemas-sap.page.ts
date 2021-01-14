import { Component, OnInit } from '@angular/core';
import { DataEntryClass, FeathersService } from '@alliax/feathers-client';
import {
  Configuracion,
  ConfiguracionQuery,
  ConfiguracionService,
  createConfiguracion,
  createSapFormas,
  FormasStateService,
  Sap,
  SapFormas,
  SapFormasQuery,
  SapFormasService,
  SapQuery,
} from '@indelpro-contraloria/data';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'indelpro-contraloria-sistemas-sap',
  templateUrl: './sistemas-sap.page.html',
  styleUrls: ['./sistemas-sap.page.scss'],
})
export class SistemasSapPage
  extends DataEntryClass<SapFormas, SapFormasService>
  implements OnInit {
  registros$ = this.sapFormasQuery.selectAll();
  model = createSapFormas({});
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
      key: 'ashost',
      type: 'input',
      templateOptions: {
        label: 'IP o hostname del servidor',
        placeholder: 'Ingresa la IP o el hostname',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'sysid',
      type: 'input',
      templateOptions: {
        label: 'System ID',
        placeholder: 'Ingresa el System ID del servidor SAP',
        labelPosition: 'stacked',
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'sysnr',
      type: 'input',
      templateOptions: {
        label: 'System Number',
        placeholder: 'Ingresa el System Number del servidor SAP',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'client',
      type: 'input',
      templateOptions: {
        label: 'Cliente del servidor SAP',
        placeholder: 'Ingresa el cliente',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'lang',
      type: 'input',
      templateOptions: {
        label: 'Clave de idioma del servidor SAP',
        placeholder: 'Ingresa la clave del idioma',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'user',
      type: 'input',
      templateOptions: {
        label: 'User de conexión',
        placeholder: 'Ingresa el user',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar este dato',
        },
      },
    },
    {
      key: 'passwd',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password del user de conexión',
        placeholder: 'Ingresa el password',
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
    private sapFormasQuery: SapFormasQuery,
    private sapFormasService: SapFormasService
  ) {
    super(loadingCtrl, toastCtrl, alertCtrl, sapFormasService, feathersService);
  }

  ngOnInit() {}
}
