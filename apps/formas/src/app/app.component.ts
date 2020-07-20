import { Component, OnInit } from '@angular/core';
import { AuthQuery, User, AuthService } from '@alliax/feathers-client';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { MenuService } from './services/menu.service';
import { FormasStateService } from '@indelpro-contraloria/data';

@Component({
  selector: 'indelpro-contraloria-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<User> = this.authQuery.selectUser$;
  menu;
  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private alertCtrl: AlertController,
    private router: Router,
    private menuCtrl: MenuController,
    private menuService: MenuService,
    private formasStateService: FormasStateService,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {});
  }

  ngOnInit() {
    this.authService
      .login()
      .then(() => this.formasStateService.loadState())
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
          handler: () => {
            this.menuCtrl.close();
            this.authService
              .logout()
              .then(() => this.router.navigateByUrl('/auth'));
          },
        },
      ],
    });
    cerrar.present();
  }
}
