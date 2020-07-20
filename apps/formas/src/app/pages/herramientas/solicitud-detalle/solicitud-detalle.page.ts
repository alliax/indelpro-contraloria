import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FeathersService,
  User,
  AuthQuery,
  BaseClass,
} from '@alliax/feathers-client';
import {
  SolicitudDetalle,
  SolicitudesService,
} from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'indelpro-contraloria-solicitud-detalle',
  templateUrl: './solicitud-detalle.page.html',
  styleUrls: ['./solicitud-detalle.page.scss'],
})
export class SolicitudDetallePage extends BaseClass implements OnInit {
  user$: Observable<User> = this.authQuery.selectUser$;
  idwf: string;
  solicitud: SolicitudDetalle;
  constructor(
    private activated: ActivatedRoute,
    private feathersService: FeathersService,
    private authQuery: AuthQuery,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected router: Router,
    private solicitudesService: SolicitudesService
  ) {
    super(loadingCtrl, toastCtrl, alertCtrl);
  }

  async ngOnInit() {
    await super.showLoading({});
    this.idwf = this.activated.snapshot.paramMap.get('id');
    this.feathersService
      .service('formas-solicitudes')
      .get(this.idwf)
      .then((detalle: SolicitudDetalle) => {
        this.solicitud = detalle;
        console.log(this.solicitud);
      })
      .catch((err) => console.log(err))
      .then(async () => await super.hideLoading());
  }

  async rechazar() {
    await super.showLoading();
    this.feathersService
      .service('formas-solicitudes')
      .update(this.idwf, {
        ACTION: 'R',
        STEP: this.solicitud.config.step,
      })
      .then(async (val) => {
        await this.solicitudesService.singleLoad();
        await super.showToast({
          message: 'La solicitud se rechazó exitosamente',
          duration: 4000,
          color: 'success',
        });
        this.router.navigateByUrl('/herramientas/dashboard');
      })
      .catch(
        async (err) =>
          await super.showToast({
            message: 'Ocurrió un error al rechazar la solicitud',
            duration: 4000,
            color: 'danger',
          })
      )
      .then(async () => {
        await super.hideLoading();
      });
  }
  async aprobar() {
    await this.actualizarSolicitud({});
  }

  async actualizarSolicitud(data) {
    await super.showLoading();
    this.feathersService
      .service('formas-solicitudes')
      .update(this.idwf, {
        ACTION: 'A',
        STEP: this.solicitud.config.step,
      })
      .then(async (val) => {
        await this.solicitudesService.singleLoad();
        await super.showToast({
          message: ' exitosamente',
          duration: 4000,
          color: 'success',
        });
        this.router.navigateByUrl('/herramientas/dashboard');
      })
      .catch(
        async (err) =>
          await super.showToast({
            message: 'Ocurrió un error al aprobar la solicitud',
            duration: 4000,
            color: 'danger',
          })
      )
      .then(async () => {
        await super.hideLoading();
      });
  }
}
