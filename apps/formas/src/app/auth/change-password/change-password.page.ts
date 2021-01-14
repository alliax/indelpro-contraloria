import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { FeathersService, AuthService } from '@alliax/feathers-client';

@Component({
  selector: 'alx-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit, OnDestroy {
  newPassword: string;
  isVisible = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {}

  async ngOnDestroy() {
  }

  async ngOnInit() {
  }

  async actualizar() {
    const token = this.route.snapshot.queryParamMap.get('token');
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando tu nueva contraseña',
    });
    await loading.present();
    try {
      await this.feathersService.service('authManagement').create({
        action: 'resetPwdLong',
        value: {
          token,
          password: this.newPassword,
        },
      });
      await (
        await this.toastCtrl.create({
          message:
            '¡Gracias! Actualizaste exitosamente tu contraseña, por favor inicia sesión de nuevo',
          duration: 4000,
          color: 'success',
        })
      ).present();
      await this.authService.logout();
      await this.router.navigateByUrl('/auth/login');
    } catch (err) {
      await (
        await this.toastCtrl.create({
          message:
            'Ocurrió un error al actualizar tu contraseña. Probablemente la liga expiró, por favor solicita un nuevo correo',
          duration: 4000,
          color: 'danger',
        })
      ).present();
      await this.router.navigateByUrl(
        '/auth/forgot-password'
      );
    } finally {
      await loading.dismiss();
    }
  }
}
