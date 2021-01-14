import { Component, OnInit } from '@angular/core';
import {
  AuthQuery,
  AuthService,
  FeathersService,
  User,
} from '@alliax/feathers-client';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'indelpro-contraloria-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  user$: Observable<User> = this.authQuery.selectUser$;
  file: File;
  form = {
    password: '',
    newPass: '',
    confirmPass: '',
  };

  constructor(
    private authQuery: AuthQuery,
    private feathers: FeathersService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async actualizarPassword() {
    if (this.form.password.length === 0) {
      return;
    }
    if (this.form.newPass !== this.form.confirmPass) {
      await (
        await this.toastCtrl.create({
          message: 'La nueva contraseña no coincide con su confirmación',
          duration: 4500,
          color: 'danger',
        })
      ).present();
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando contraseña',
    });
    await loading.present();
    try {
      await this.authService.updatePasswordByEmail(
        this.form.password,
        this.form.newPass
      );
      this.form = {
        password: '',
        newPass: '',
        confirmPass: '',
      };
      await (
        await this.toastCtrl.create({
          message: 'Se actualizó tu contraseña exitosamente',
          duration: 4500,
          color: 'success',
        })
      ).present();
    } catch (err) {
      await (
        await this.toastCtrl.create({
          message: 'Ocurrió un error al actualizar tu contraseña',
          duration: 4500,
          color: 'danger',
        })
      ).present();
    } finally {
      await loading.dismiss();
    }
  }

  async actualizarFoto(file) {
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando fotografía',
    });
    await loading.present();
    const user = await this.user$.pipe(take(1)).toPromise();
    try {
      const uploaded = await this.feathers.upload(file);
      const updated = await this.feathers.service('users').patch(user._id, {
        foto: uploaded.id,
      });
    } catch (err) {
      console.log(err);
    } finally {
      await loading.dismiss();
    }
  }
}
