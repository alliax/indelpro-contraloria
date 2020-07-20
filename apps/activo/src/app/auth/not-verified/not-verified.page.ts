import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ToastController,
  AlertController
} from '@ionic/angular';
import {
  FeathersService,
  AuthService,
  AuthQuery
} from '@alliax/feathers-client';

@Component({
  selector: 'alx-not-verified',
  templateUrl: './not-verified.page.html',
  styleUrls: ['./not-verified.page.scss']
})
export class NotVerifiedPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService,
    private authService: AuthService,
    private authQuery: AuthQuery
  ) {}

  ngOnInit() {}

  async cerrarSesion() {
    const cerrar = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí, salir',
          handler: () =>
            this.authService
              .logout()
              .then(() => this.router.navigateByUrl('/auth'))
        }
      ]
    });
    cerrar.present();
  }

  async enviarCorreo() {
    const user = this.authQuery.getValue().user;
    const loading = await this.loadingCtrl.create({
      message: 'Enviando correo'
    });
    await loading.present();
    this.feathersService
      .service('authManagement')
      .create({
        action: 'resendVerifySignup',
        value: { email: user.email }
      })
      .then(() =>
        this.toastCtrl
          .create({
            message:
              'Se ha enviado exitosamente un nuevo correo para la validación de tu cuenta, por favor revisa tu buzón de entrada',
            duration: 4000,
            color: 'success'
          })
          .then(alert => alert.present())
      )
      .catch(err =>
        this.toastCtrl
          .create({
            message:
              'Ocurrió un error al enviar el correo para la validación de tu cuenta, por favor intenta de nuevo',
            duration: 4000,
            color: 'danger'
          })
          .then(alert => alert.present())
      )
      .then(() => loading.dismiss());
  }
}
