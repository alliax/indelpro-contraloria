import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ToastController,
  AlertController,
  MenuController,
} from '@ionic/angular';
import {
  FeathersService,
  AuthService,
  AuthQuery,
} from '@alliax/feathers-client';

@Component({
  selector: 'alx-not-verified',
  templateUrl: './not-verified.page.html',
  styleUrls: ['./not-verified.page.scss'],
})
export class NotVerifiedPage implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService,
    private authService: AuthService,
    private authQuery: AuthQuery,
    private menuCtrl: MenuController
  ) {}

  async ngOnDestroy() {
  }

  async ngOnInit() {
  }

  async cerrarSesion() {
    await (
      await this.alertCtrl.create({
        header: 'Cerrar sesión',
        message: '¿Deseas cerrar sesión?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Sí, salir',
            handler: async () => {
              await this.authService.logout();
              await this.router.navigateByUrl('/auth');
            },
          },
        ],
      })
    ).present();
  }

  async enviarCorreo() {
    const user = this.authQuery.getValue().user;
    const loading = await this.loadingCtrl.create({
      message: 'Enviando correo',
    });
    await loading.present();

    try {
      await this.feathersService.service('authManagement').create({
        action: 'resendVerifySignup',
        value: { email: user.email },
      });
      await (
        await this.toastCtrl.create({
          message:
            'Se ha enviado exitosamente un nuevo correo para la validación de tu cuenta, por favor revisa tu buzón de entrada',
          duration: 4000,
          color: 'success',
        })
      ).present();
    } catch (err) {
      await (
        await this.toastCtrl.create({
          message:
            'Ocurrió un error al enviar el correo para la validación de tu cuenta, por favor intenta de nuevo',
          duration: 4000,
          color: 'danger',
        })
      ).present();
    } finally {
      await loading.dismiss();
    }
  }
}
