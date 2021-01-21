import { Component, NgZone, OnInit } from '@angular/core';
import { AuthQuery, AuthService, NavMenu, User } from '@alliax/feathers-client';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { MenuService } from './services/menu.service';
import { FormasStateService } from '@indelpro-contraloria/data';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Filesystem } from '@capacitor/filesystem';
import { filter, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<User> = this.authQuery.selectUser$;
  shouldShowMenu$: Observable<boolean> = this.authQuery
    .shouldDisplayMemberContent$;
  menu$: Observable<NavMenu[]>;
  menuAdmin$: Observable<NavMenu[]>;
  isWeb: boolean = this.platform.is('desktop');
  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private alertCtrl: AlertController,
    private router: Router,
    private menuCtrl: MenuController,
    private menuService: MenuService,
    private formasStateService: FormasStateService,
    private platform: Platform,
    private activated: ActivatedRoute,
    private zone: NgZone
  ) {}

  async ngOnInit() {
    try {
      await SplashScreen.show({});
      await this.initPlugins();
      this.menu$ = this.menuService.getMenu();
      this.menuAdmin$ = this.user$.pipe(
        filter((val) => !!val),
        switchMap((val) =>
          val.role.includes('formas-admin')
            ? this.menuService.getMenuAdmin()
            : of([])
        )
      );
      await this.authService.reAuthenticate();
      await this.formasStateService.loadState();
    } catch (err) {
      console.log('ngOnInit', err);
    } finally {
      await SplashScreen.hide({ fadeOutDuration: 350 });
    }
  }

  async initPlugins() {
    try {
      await StatusBar.setBackgroundColor({
        color: '003459',
      });
      await StatusBar.setStyle({ style: Style.Dark });
      App.addListener('appUrlOpen', (data: any) => {
        this.zone.run(() => {
          const slug = data.url.split('/indelpro/formas').pop();
          if (slug) {
            try {
              this.router.navigateByUrl(slug);
            } catch (err) {
              console.log(err);
            }
          }
        });
      });
      App.addListener('backButton', async () => {
        if (this.activated.snapshot.fragment === 'dashboard') {
          const salir = await this.alertCtrl.create({
            header: 'Cerrar la aplicación',
            message: '¿Desear cerrar y salir de la aplicación?',
            buttons: [
              {
                text: 'No',
                role: 'cancel',
              },
              {
                text: 'Sí',
                handler: () => App.exitApp(),
              },
            ],
          });
          await salir.present();
        } else {
          window.history.back();
        }
      });
    } catch (err) {}
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
