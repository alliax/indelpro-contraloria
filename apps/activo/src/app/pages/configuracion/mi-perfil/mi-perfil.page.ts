import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  User,
  AuthQuery,
  AuthService,
  FeathersService,
} from '@alliax/feathers-client';
import { LoadingController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'indelpro-contraloria-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiPerfilPage implements OnInit {
  user$: Observable<User> = this.authQuery.selectUser$;
  @ViewChild('foto', { read: ElementRef, static: false }) foto: ElementRef;
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'oldPassword',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Contraseña actual',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar tu contraseña actual',
        },
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Nueva contraseña',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar tu nueva contraseña',
        },
      },
    },
  ];
  model: {
    oldPassword: string;
    password: string;
  };

  constructor(
    private authQuery: AuthQuery,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private feathersService: FeathersService
  ) {}

  ngOnInit() {}

  async actualizarFoto(event) {
    (await this.foto.nativeElement.getInputElement()).click();
  }

  async fotoSeleccionada(file: any) {
    const archivo = file.target.firstElementChild.files[0];
    if (archivo) {
      const loading = await this.loadingCtrl.create();
      loading.present();
      this.feathersService
        .upload(archivo)
        .then(async (uploaded) => {
          this.authService.updateProfile({
            foto: uploaded.id,
          });
        })
        .catch((err) => {})
        .then(() => loading.dismiss());
      file.target.value = '';
    }
  }

  async actualizarPassword(){
    this.authService.
  }
}
