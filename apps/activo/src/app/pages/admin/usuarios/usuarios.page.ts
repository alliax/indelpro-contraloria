import { Component, OnInit } from '@angular/core';
import {
  Usuario,
  UsuariosService,
  UsuariosQuery,
  TipoActivo,
  createUsuario,
} from '@indelpro-contraloria/data';
import { DataEntryClass, FeathersService } from '@alliax/feathers-client';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage
  extends DataEntryClass<Usuario, UsuariosService>
  implements OnInit
{
  registros$ = this.usuariosQuery.selectAll();
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
        label: 'Nombre del usuario',
        placeholder: 'Ingresa un nombre',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar el nombre del usuario',
        },
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Correo electrónico',
        placeholder: 'Ingresa un correo electrónico',
        labelPosition: 'stacked',
        required: true,
      },
      expressionProperties: {
        'templateOptions.disabled': (model) => model._id,
      },
      validation: {
        messages: {
          required: 'Debes ingresar el correo electrónico',
        },
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Contraseña',
        placeholder: 'Ingresa la contraseña del usuario',
        labelPosition: 'stacked',
        required: true,
      },
      expressionProperties: {
        'templateOptions.disabled': (model) => model._id,
      },
      validation: {
        messages: {
          required: 'Debes ingresar la contraseña del usuario',
        },
      },
    },
    {
      key: 'foto',
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
    private usuariosQuery: UsuariosQuery,
    private usuariosService: UsuariosService
  ) {
    super(
      loadingCtrl,
      toastCtrl,
      alertCtrl,
      usuariosService,
      feathersService,
      createUsuario
    );
  }

  ngOnInit() {}

  async update(model: Partial<Usuario>): Promise<any> {
    try {
      await super.upload(model, 'foto');
    } catch (err) {}
    delete model.email;
    delete model.password;
    return super.update(model);
  }

  async create(model: Partial<Usuario>): Promise<any> {
    try {
      await super.upload(model, 'foto');
    } catch (err) {}
    return super.create(model);
  }
}
