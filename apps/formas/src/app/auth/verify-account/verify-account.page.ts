import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FeathersService, AuthService } from '@alliax/feathers-client';

@Component({
  selector: 'alx-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss']
})
export class VerifyAccountPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private feathersService: FeathersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    this.feathersService
      .service('authManagement')
      .create({
        action: 'verifySignupLong',
        value: token
      })
      .then(() => {
        this.toastCtrl
          .create({
            message:
              '¡Gracias! Tu cuenta ha sido validada satisfactoriamente, por favor inicia sesión de nuevo para continuar',
            duration: 4000,
            color: 'success'
          })
          .then(alerta => alerta.present());
        this.authService.logout();
        this.router.navigateByUrl('/auth');
      })
      .catch(() => {
        this.toastCtrl
          .create({
            message:
              'Ocurrió un error al validar tu cuenta. Probablemente la liga expiró, por favor solicita un nuevo correo',
            duration: 4000,
            color: 'danger'
          })
          .then(alerta => alerta.present());
        this.router.navigateByUrl('/auth/not-verified');
      });
  }
}
