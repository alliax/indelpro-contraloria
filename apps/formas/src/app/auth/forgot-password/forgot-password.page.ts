import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FeathersService } from '@alliax/feathers-client';

@Component({
  selector: 'alx-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  email: string;
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService
  ) {}

  ngOnInit() {}

  async enviarCorreo() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando correo'
    });
    await loading.present();
    this.feathersService
      .service('authManagement')
      .create({
        action: 'sendResetPwd',
        value: { email: this.email }
      })
      .then(() =>
        this.toastCtrl
          .create({
            message:
              'Se ha enviado correctamente el correo para resetear tu contraseña, por favor valida en tu buzón de entrada',
            duration: 4000,
            color: 'success'
          })
          .then(alert => alert.present())
      )
      .catch(err =>
        this.toastCtrl
          .create({
            message:
              'Ocurrió un error al enviar el correo para el cambio de contraseña, por favor intenta de nuevo',
            duration: 4000,
            color: 'danger'
          })
          .then(alert => alert.present())
      )
      .then(() => loading.dismiss());
  }
}
