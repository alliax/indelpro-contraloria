import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FeathersService,
  User,
  AuthQuery,
  BaseClass,
} from '@alliax/feathers-client';
import {
  Configuracion,
  ConfiguracionQuery,
  SolicitudDetalle,
  SolicitudDetalleCompras,
  SolicitudDetalleIndelpro,
  SolicitudesService,
} from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-solicitud-detalle',
  templateUrl: './solicitud-detalle.page.html',
  styleUrls: ['./solicitud-detalle.page.scss'],
})
export class SolicitudDetallePage extends BaseClass implements OnInit {
  user$: Observable<User> = this.authQuery.selectUser$;
  idwf: string;
  proceso: string;
  solicitud: SolicitudDetalle;
  solicitudIndelpro: SolicitudDetalleIndelpro;
  solicitudCompras: SolicitudDetalleCompras;
  configuracionActiva: Configuracion;

  constructor(
    private activated: ActivatedRoute,
    private feathersService: FeathersService,
    private authQuery: AuthQuery,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected router: Router,
    private solicitudesService: SolicitudesService,
    public sanitizer: DomSanitizer,
    private configuracionQuery: ConfiguracionQuery
  ) {
    super(loadingCtrl, toastCtrl, alertCtrl);
  }

  async ngOnInit() {
    await super.showLoading({});
    this.idwf = this.activated.snapshot.paramMap.get('id');
    this.proceso = this.activated.snapshot.paramMap.get('proceso');
    try {
      const solicitud = await this.feathersService
        .service('formas-solicitudes')
        .get(this.idwf, {
          query: {
            proceso: this.proceso,
          },
        });
      if (!solicitud) {
        const solicitudIndelpro = await this.feathersService
          .service('formas/solicitudes-indelpro')
          .get(this.idwf, {
            query: {
              proceso: this.proceso,
            },
          });
        if (solicitudIndelpro?.HTML?.length === 0) {
          const solicitudCompras = await this.feathersService
            .service('formas/solicitudes-compras')
            .get(this.idwf);
          this.solicitudCompras = solicitudCompras;
        } else {
          this.solicitudIndelpro = solicitudIndelpro;
          this.solicitudIndelpro.HTML = this.solicitudIndelpro.HTML.replace(
            /(<style[\w\W]+style>)/g,
            ''
          );
        }
      } else {
        this.solicitud = solicitud;
      }
      // console.log(this.solicitud);
      // console.log(this.solicitudIndelpro);
      // console.log(this.solicitudCompras);
    } catch (err) {
      console.log(err);
    } finally {
      await super.hideLoading();
    }
  }

  async abrirPdf() {
    const arr = new Uint8Array(this.solicitudIndelpro.PDF);
    const blob = new Blob([arr], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  }

  async abrirAdjunto(archivo) {
    await this.configuracionQuery.activa$.pipe(take(1)).toPromise();
    const urlArchivos = (
      await this.configuracionQuery.activa$.pipe(take(1)).toPromise()
    )?.url;
    window.open(`${urlArchivos}${archivo}`);
  }
  async rechazarIndelpro() {
    await super.showLoading();
    try {
      const respuesta = await this.feathersService
        .service('formas/solicitudes-indelpro')
        .update(this.idwf, {
          proceso: this.proceso,
          decision: 'R',
        });
      await this.solicitudesService.singleLoad();
      await super.showToast({
        message: respuesta.RETURN,
        duration: 6000,
        color: 'dark',
      });
      await this.router.navigateByUrl('/herramientas/dashboard');
    } catch (err) {
      await super.showToast({
        message: 'Ocurrió un error al rechazar la solicitud',
        duration: 4000,
        color: 'danger',
      });
    } finally {
      await super.hideLoading();
    }
  }

  async aprobarIndelpro() {
    await super.showLoading();
    try {
      const respuesta = await this.feathersService
        .service('formas/solicitudes-indelpro')
        .update(this.idwf, {
          proceso: this.proceso,
          decision: 'A',
        });
      await this.solicitudesService.singleLoad();
      await super.showToast({
        message: respuesta.RETURN,
        duration: 6000,
        color: 'dark',
      });
      await this.router.navigateByUrl('/herramientas/dashboard');
    } catch (err) {
      console.log(err);
      await super.showToast({
        message: 'Ocurrió un error al aprobar la solicitud',
        duration: 4000,
        color: 'danger',
      });
    } finally {
      await super.hideLoading();
    }
  }

  async rechazarCompras() {
    await super.showLoading();
    try {
      const respuesta = await this.feathersService
        .service('formas/solicitudes-compras')
        .update(this.idwf, {
          decision: 'REJECT',
        });
      await this.solicitudesService.singleLoad();
      await super.showToast({
        message: 'La solicitud se rechazó exitosamente',
        duration: 4000,
        color: 'success',
      });
      await this.router.navigateByUrl('/herramientas/dashboard');
    } catch (err) {
      await super.showToast({
        message: 'Ocurrió un error al rechazar la solicitud',
        duration: 4000,
        color: 'danger',
      });
    } finally {
      await super.hideLoading();
    }
  }

  async aprobarCompras() {
    await super.showLoading();
    try {
      const respuesta = await this.feathersService
        .service('formas/solicitudes-compras')
        .update(this.idwf, {
          decision: 'APPROVE',
        });
      await this.solicitudesService.singleLoad();
      await super.showToast({
        message: 'La solicitud se aprobó exitosamente',
        duration: 4000,
        color: 'success',
      });
      await this.router.navigateByUrl('/herramientas/dashboard');
    } catch (err) {
      console.log(err);
      await super.showToast({
        message: 'Ocurrió un error al aprobó la solicitud',
        duration: 4000,
        color: 'danger',
      });
    } finally {
      await super.hideLoading();
    }
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
