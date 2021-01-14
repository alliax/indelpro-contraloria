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
  implements OnInit {
  registros$ = this.usuariosQuery.selectAll();
  model = createUsuario({});
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
      defaultValue: 'Indelpro2020%$',
      templateOptions: {
        label: 'Contraseña',
        placeholder: 'Ingresa la contraseña del usuario',
        labelPosition: 'stacked',
        required: true,
        disabled: true,
      },
      expressionProperties: {},
      validation: {
        messages: {
          required: 'Debes ingresar la contraseña del usuario',
        },
      },
    },
    {
      key: 'profile.variant',
      type: 'input',
      templateOptions: {
        label: 'Variante SAP',
        placeholder: 'Ej. INDP',
        labelPosition: 'stacked',
      },
    },
    {
      key: 'profile.object', //indpsp
      type: 'input',
      templateOptions: {
        label: 'Objeto SAP',
        placeholder: 'Ej. INDP',
        labelPosition: 'stacked',
      },
    },
    {
      key: 'profile.userSapIndelpro',
      type: 'input',
      templateOptions: {
        label: 'Usuario SAP Indelpro',
        placeholder: 'Ingresa el usuario SAP de Indelpro',
        labelPosition: 'stacked',
      },
    },
    {
      key: 'profile.userSap',
      type: 'input',
      templateOptions: {
        label: 'Usuario SAP (SRM y Compras)',
        placeholder: 'Ingresa el usuario SAP (SRM y Compras)',
        labelPosition: 'stacked',
      },
    },
    {
      key: 'profile.puesto',
      type: 'input',
      templateOptions: {
        label: 'Puesto',
        placeholder: 'Ingresa el puesto del usuario',
        labelPosition: 'stacked',
      },
    },
    {
      key: 'profile.departamento',
      type: 'input',
      templateOptions: {
        label: 'Departamento',
        placeholder: 'Ingresa el departamento al que pertenece el usuario',
        labelPosition: 'stacked',
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
    {
      key: 'role',
      type: 'input',
      className: 'form-hidden',
      templateOptions: {
        type: 'hidden',
      },
    },
    {
      key: 'formasRoles',
      type: 'select',
      templateOptions: {
        label: 'Roles del usuario',
        labelPosition: 'stacked',
        multiple: true,
        options: [
          {
            label: 'Usuario Formas',
            value: 'formas-user',
          },
          {
            label: 'Admin Formas',
            value: 'formas-admin',
          },
        ],
        required: true,
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
    super(loadingCtrl, toastCtrl, alertCtrl, usuariosService, feathersService);
  }

  ngOnInit() {}

  async edit(model: Partial<Usuario>) {
    await super.edit(model);
    this.form.get('formasRoles').patchValue([...model.role]);
  }

  async update(model: Partial<Usuario>): Promise<any> {
    try {
      await super.upload(model, 'foto');
    } catch (err) {}
    delete model.email;
    delete model.password;
    model.profile = {
      ...model.profile,
    };
    const rolesExternos = model.role.filter((r) => !r.includes('formas'));
    model.role = [...rolesExternos, ...model.formasRoles];
    return super.update(model);
  }

  async create(model: Partial<Usuario>): Promise<any> {
    try {
      model.role = [...model.formasRoles];
      model.profile.creationApp = 'formas';
      await super.upload(model, 'foto');
    } catch (err) {}
    return super.create(model);
  }

  async resetButton() {
    await super.resetButton();
    this.form.get('password').patchValue('Indelpro2020%$');
  }
}
