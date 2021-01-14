import { Component, OnInit } from '@angular/core';
import { DataEntryClass, FeathersService } from '@alliax/feathers-client';
import {
  createTipo,
  Tipo,
  TiposQuery,
  TiposService,
} from '@indelpro-contraloria/data';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'indelpro-contraloria-tipo-solicitudes',
  templateUrl: './tipo-solicitudes.page.html',
  styleUrls: ['./tipo-solicitudes.page.scss'],
})
export class TipoSolicitudesPage
  extends DataEntryClass<Tipo, TiposService>
  implements OnInit {
  registros$ = this.tiposQuery.selectAll();
  model = createTipo({});
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
        label: 'Nombre del tipo de solicitud',
        placeholder: 'Ingresa un nombre',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar un nombre',
        },
      },
    },
    {
      key: 'clave',
      type: 'input',
      templateOptions: {
        label: 'Clave del tipo de solicitud',
        placeholder: 'Ingresa una clave',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar una clave',
        },
      },
    },
  ];

  constructor(
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected feathersService: FeathersService,
    private tiposQuery: TiposQuery,
    private tiposService: TiposService
  ) {
    super(loadingCtrl, toastCtrl, alertCtrl, tiposService, feathersService);
  }

  ngOnInit() {}
}
