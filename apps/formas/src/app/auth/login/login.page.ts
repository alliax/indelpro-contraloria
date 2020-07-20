import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@alliax/feathers-client';
import { FormasStateService } from '@indelpro-contraloria/data';

@Component({
  selector: 'alx-auth-ionic-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  isVisible = false;
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private formasState: FormasStateService
  ) {}

  ngOnInit() {}

  async iniciarSesion() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión',
    });
    await loading.present();

    this.authService
      .login({
        strategy: 'local',
        email: this.email,
        password: this.password,
      })
      .then((user) => {
        this.email = '';
        this.password = '';
        this.isVisible = false;
        this.formasState.loadState();
        this.router.navigateByUrl('/');
      })
      .catch(async (err) => {
        const error = await this.toastCtrl.create({
          message:
            'Ocurrió un error al iniciar sesión, por favor intenta de nuevo',
          duration: 4000,
          color: 'danger',
        });
        error.present();
      })
      .then(() => loading.dismiss());
  }
}
