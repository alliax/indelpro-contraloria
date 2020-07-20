import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService, AuthService } from '@alliax/feathers-client';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'alx-auth-ionic-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  nombre: string;
  email: string;
  password: string;
  isVisible = false;
  constructor(
    private router: Router,
    private feathersService: FeathersService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async registrar() {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando tu cuenta'
    });
    await loading.present();
    this.feathersService
      .service('users')
      .create({
        nombre: this.nombre,
        email: this.email,
        password: this.password
      })
      .then(user =>
        this.authService
          .login({
            strategy: 'local',
            email: this.email,
            password: this.password
          })
          .then(() => {
            // Load state for user.
            // this.stateService.loadState();
            this.nombre = '';
            this.email = '';
            this.password = '';
            this.isVisible = false;
            this.router.navigateByUrl('/');
          })
      )
      .catch(async err => {
        const error = await this.toastCtrl.create({
          message:
            'Ocurrió un error al crear tu cuenta, por favor intenta de nuevo',
          duration: 4000,
          color: 'danger'
        });
        error.present();
      })
      .then(() => loading.dismiss());
  }
}
