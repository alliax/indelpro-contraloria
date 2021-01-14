import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  LoadingController,
  MenuController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@alliax/feathers-client';
import { FormasStateService } from '@indelpro-contraloria/data';

@Component({
  selector: 'alx-auth-ionic-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  email: string;
  password: string;
  isVisible = false;
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private formasStateService: FormasStateService
  ) {}

  async ngOnDestroy() {}

  async ngOnInit() {}

  async iniciarSesion() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión',
    });
    await loading.present();

    try {
      await this.authService.login({
        strategy: 'local',
        email: this.email,
        password: this.password,
      });
      this.email = '';
      this.password = '';
      this.isVisible = false;
      await this.formasStateService.loadState();
      await this.navCtrl.navigateRoot('/');
    } catch (err) {
      await (
        await this.toastCtrl.create({
          message:
            'Ocurrió un error al iniciar sesión, por favor intenta de nuevo',
          duration: 4000,
          color: 'danger',
        })
      ).present();
    } finally {
      await loading.dismiss();
    }
  }
}
