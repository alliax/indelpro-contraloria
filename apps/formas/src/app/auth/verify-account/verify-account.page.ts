import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { FeathersService, AuthService } from '@alliax/feathers-client';

@Component({
  selector: 'alx-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss'],
})
export class VerifyAccountPage implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {}

  async ngOnDestroy() {}

  async ngOnInit() {
    try {
      const token = this.route.snapshot.queryParamMap.get('token');
      await this.feathersService.service('authManagement').create({
        action: 'verifySignupLong',
        value: token,
      });
      await (
        await this.toastCtrl.create({
          message:
            '¡Gracias! Tu cuenta ha sido validada satisfactoriamente, por favor inicia sesión de nuevo para continuar',
          duration: 4000,
          color: 'success',
        })
      ).present();

      await this.router.navigateByUrl('/herramientas');
    } catch (err) {
      await (
        await this.toastCtrl.create({
          message:
            'Ocurrió un error al validar tu cuenta. Probablemente la liga expiró, por favor solicita un nuevo correo',
          duration: 4000,
          color: 'danger',
        })
      ).present();
      await this.router.navigateByUrl('/auth/not-verified');
    }
  }
}
