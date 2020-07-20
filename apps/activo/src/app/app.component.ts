import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User, AuthService, AuthQuery } from '@alliax/feathers-client';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuService } from './services/menu.service';
import { StateService } from '@indelpro-contraloria/data';

@Component({
  selector: 'indelpro-contraloria-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$: Observable<User> = this.authQuery.selectUser$;
  menu;
  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private alertCtrl: AlertController,
    private router: Router,
    private menuService: MenuService,
    private stateService: StateService
  ) {
    this.authService
      .login()
      .then(() => {
        this.stateService.loadState();
      })
      .catch((err) => {})
      .then(() => {
        this.menu = this.menuService.getMenu();
      });
  }

  async cerrarSesion() {
    const cerrar = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí, salir',
          handler: () =>
            this.authService
              .logout()
              .then(() => this.router.navigateByUrl('/auth')),
        },
      ],
    });
    cerrar.present();
  }
}
