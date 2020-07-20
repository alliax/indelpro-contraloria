import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FeathersService, AuthService } from '@alliax/feathers-client';

@Component({
  selector: 'alx-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss']
})
export class ChangePasswordPage implements OnInit {
  newPassword: string;
  isVisible = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async actualizar() {
    const token = this.route.snapshot.queryParamMap.get('token');
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando tu nueva contraseña'
    });
    await loading.present();
    this.feathersService
      .service('authManagement')
      .create({
        action: 'resetPwdLong',
        value: {
          token,
          password: this.newPassword
        }
      })
      .then(() => {
        this.toastCtrl
          .create({
            message:
              '¡Gracias! Actualizaste exitosamente tu contraseña, por favor inicia sesión de nuevo',
            duration: 4000,
            color: 'success'
          })
          .then(alerta => alerta.present());
        this.authService.logout();
        this.router.navigateByUrl('/auth/login');
      })
      .catch(() => {
        this.toastCtrl
          .create({
            message:
              'Ocurrió un error al actualizar tu contraseña. Probablemente la liga expiró, por favor solicita un nuevo correo',
            duration: 4000,
            color: 'danger'
          })
          .then(alerta => alerta.present());
        this.router.navigateByUrl('/auth/forgot-password');
      })
      .then(() => loading.dismiss());
  }
}
