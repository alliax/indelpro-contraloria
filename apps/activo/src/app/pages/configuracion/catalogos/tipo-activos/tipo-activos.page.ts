import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import {
  AuthService,
  FeathersService,
  DataEntryClass,
} from '@alliax/feathers-client';
import {
  createTipoActivo,
  TipoActivo,
  TipoActivosService,
  TipoActivosQuery,
} from '@indelpro-contraloria/data';

@Component({
  selector: 'indelpro-contraloria-tipo-activos',
  templateUrl: './tipo-activos.page.html',
  styleUrls: ['./tipo-activos.page.scss'],
})
export class TipoActivosPage
  extends DataEntryClass<TipoActivo, TipoActivosService>
  implements OnInit {
  registros$ = this.tipoActivosQuery.selectAll();
  model = createTipoActivo({});
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
        label: 'Nombre del tipo de activo',
        placeholder: 'Ingresa un nombre',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar el nombre del tipo de activo',
        },
      },
    },
    {
      key: 'claveSap',
      type: 'input',
      templateOptions: {
        label: 'Clave SAP del tipo de activo',
        placeholder: 'Ingresa la clave SAP',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar la clave SAP del tipo de activo',
        },
      },
    },
    {
      key: 'imagen',
      type: 'input',
      className: 'form-hidden',
      templateOptions: {
        type: 'hidden',
      },
    },
  ];

  constructor(
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected feathersService: FeathersService,
    private tipoActivosQuery: TipoActivosQuery,
    private tipoActivosService: TipoActivosService
  ) {
    super(
      loadingCtrl,
      toastCtrl,
      alertCtrl,
      tipoActivosService,
      feathersService
    );
  }

  ngOnInit() {}

  async update(model: Partial<TipoActivo>): Promise<any> {
    try {
      await super.upload(model, 'imagen');
    } catch (err) {}
    return super.update(model);
  }

  async create(model: Partial<TipoActivo>): Promise<any> {
    try {
      await super.upload(model, 'imagen');
    } catch (err) {}
    return super.create(model);
  }
}
