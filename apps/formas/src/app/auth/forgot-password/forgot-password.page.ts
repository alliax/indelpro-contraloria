import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { FeathersService } from '@alliax/feathers-client';

@Component({
  selector: 'alx-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit, OnDestroy {
  email: string;
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService,
    private menuCtrl: MenuController
  ) {}

  async ngOnDestroy() {
  }

  async ngOnInit() {
  }

  async enviarCorreo() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando correo',
    });
    await loading.present();
    try {
      await this.feathersService.service('authManagement').create({
        action: 'sendResetPwd',
        value: { email: this.email },
      });
      await (
        await this.toastCtrl.create({
          message:
            'Se ha enviado correctamente el correo para resetear tu contraseña, por favor valida en tu buzón de entrada',
          duration: 4000,
          color: 'success',
        })
      ).present();
    } catch (err) {
      await (
        await this.toastCtrl.create({
          message:
            'Ocurrió un error al enviar el correo para el cambio de contraseña, por favor intenta de nuevo',
          duration: 4000,
          color: 'danger',
        })
      ).present();
    } finally {
      await loading.dismiss();
    }
  }
}
