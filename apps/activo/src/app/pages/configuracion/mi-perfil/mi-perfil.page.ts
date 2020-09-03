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
import { LoadingController, ToastController } from '@ionic/angular';
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
  cumplimiento: number;
  fields: FormlyFieldConfig[] = [
    {
      key: 'oldPassword',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Contraseña actual',
        labelPosition: 'stacked',
        required: true,
        lines: 'full',
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
        lines: 'full',
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
  } = {
    oldPassword: '',
    password: '',
  };

  constructor(
    private authQuery: AuthQuery,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
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

  async actualizarPassword() {
    const actualizando = await this.loadingCtrl.create({});
    await actualizando.present();
    try {
      await this.authService.updatePasswordByEmail(
        this.model.oldPassword,
        this.model.password
      );
      await actualizando.dismiss();
      this.form.reset();
      await (
        await this.toastCtrl.create({
          message: 'Se actualizó correctamente tu contraseña',
          color: 'success',
          duration: 4500,
        })
      ).present();
    } catch (err) {
      console.error(err);
      await actualizando.dismiss();
      await (
        await this.toastCtrl.create({
          message:
            'Ocurrió un error al actualizar tu contraseña, intenta de nuevo',
          color: 'danger',
          duration: 4500,
        })
      ).present();
    }
  }
}
