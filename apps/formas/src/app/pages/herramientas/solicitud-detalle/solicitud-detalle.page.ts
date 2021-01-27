import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthQuery,
  BaseClass,
  FeathersService,
  User,
} from '@alliax/feathers-client';
import {
  Configuracion,
  ConfiguracionQuery,
  SolicitudDetalle,
  SolicitudDetalleCompras,
  SolicitudDetalleIndelpro,
  SolicitudesService,
} from '@indelpro-contraloria/data';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AlertController,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { take, tap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'indelpro-contraloria-solicitud-detalle',
  templateUrl: './solicitud-detalle.page.html',
  styleUrls: ['./solicitud-detalle.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolicitudDetallePage extends BaseClass implements OnInit {
  user$: Observable<User> = this.authQuery.selectUser$;
  idwf: string;
  proceso: string;

  solicitud: SolicitudDetalle;
  solicitudIndelpro: SolicitudDetalleIndelpro;
  solicitudCompras: SolicitudDetalleCompras;

  solicitud$: BehaviorSubject<SolicitudDetalle> = new BehaviorSubject<SolicitudDetalle>(
    null
  );
  solicitudIndelpro$: BehaviorSubject<SolicitudDetalleIndelpro> = new BehaviorSubject<SolicitudDetalleIndelpro>(
    null
  );
  solicitudCompras$: BehaviorSubject<SolicitudDetalleCompras> = new BehaviorSubject<SolicitudDetalleCompras>(
    null
  );

  configuracionActiva: Configuracion;
  pdfBase: SafeUrl;
  esWeb: boolean = this.platform.is('desktop') || this.platform.is('mobileweb');

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
    private configuracionQuery: ConfiguracionQuery,
    private platform: Platform
  ) {
    super(loadingCtrl, toastCtrl, alertCtrl);
    this.solicitudCompras$.pipe(tap((val) => console.log(val)));
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

          solicitudCompras.HTML = solicitudCompras.HTML
            /*.replace(
            /<img.*[^>]+>/gim,
            ''
          )*/
            .replace(/<style.*\/style>/gim, '')
            .replace(/rel="stylesheet"/gim, '')
            .replace(/<br>/gi, '')
            .replace(/colspan=5/gim, '')
            /*.replace(
              /<colgroup>.*[^/]colgroup>/gim,
              '<colgroup><col width="0"><col width="80%"><col class="legend2" width="0"><col width="60%"></colgroup>'
            )*/
            .replace(/Worflow lanzado/gim, '');
          this.solicitudCompras$.next(solicitudCompras);
        } else {
          solicitudIndelpro.HTML = solicitudIndelpro.HTML.replace(
            /<style.*\/style>/gim,
            ''
          );
          this.solicitudIndelpro$.next(solicitudIndelpro);
        }
      } else {
        this.solicitud$.next(solicitud);
      }
    } catch (err) {
      console.log(err);
    } finally {
      await super.hideLoading();
    }
  }

  convertBlobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async abrirPdf() {
    const arr = new Uint8Array(this.solicitudIndelpro.PDF);
    const blob = new Blob([arr], { type: 'application/pdf' });
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      const url = URL.createObjectURL(blob);
      window.open(url);
    } else {
      /*try {
        console.log(String(await this.convertBlobToBase64(blob)));
        this.pdfBase = this.sanitizer.bypassSecurityTrustResourceUrl(
          String(await this.convertBlobToBase64(blob))
        );
        await Filesystem.requestPermissions();
        const writeResult = await Filesystem.writeFile({
          path: `/pdf/${this.idwf}.pdf`,
          data: String(await this.convertBlobToBase64(blob)).replace(
            /(.*)base64,/gi,
            ''
          ),
          directory: Directory.Data,
          recursive: true,
        });
        const launched = await AppLauncher.openUrl({
          url: writeResult.uri,
        });
      } catch (err) {
        console.log(err);
      }*/
    }
  }

  async abrirAdjunto(archivo) {
    await this.configuracionQuery.activa$.pipe(take(1)).toPromise();
    const urlArchivos = (
      await this.configuracionQuery.activa$.pipe(take(1)).toPromise()
    )?.url;
    try {
      await Browser.open({
        url: `${urlArchivos}${archivo}`,
        windowName: this.idwf,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async rechazarIndelpro() {
    const confirmacion = await this.confirmar('rechazar');
    if (confirmacion !== true) return;
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
    const confirmacion = await this.confirmar('aprobar');
    if (confirmacion !== true) return;
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
    const confirmacion = await this.confirmar('rechazar');
    if (confirmacion !== true) return;
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
    const confirmacion = await this.confirmar('aprobar');
    if (confirmacion !== true) return;
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
  async rechazar(solicitud) {
    await this.actualizarSolicitud({
      ACTION: 'R',
      STEP: solicitud.config.step,
      PROCESO: this.proceso,
    });
  }
  async aprobar(solicitud) {
    await this.actualizarSolicitud({
      ACTION: 'A',
      STEP: solicitud.config.step,
      PROCESO: this.proceso,
    });
  }
  async actualizarSolicitud(data) {
    const confirmacion = await this.confirmar(
      data.ACTION === 'A' ? 'aprobar' : 'rechazar'
    );
    if (confirmacion !== true) return;
    await super.showLoading();
    this.feathersService
      .service('formas-solicitudes')
      .update(this.idwf, data)
      .then(async (val) => {
        await this.solicitudesService.singleLoad();
        await super.showToast({
          message: `La solicitud se ${
            data.ACTION === 'A' ? 'autorizó' : 'rechazó'
          } con éxito`,
          duration: 4000,
          color: 'success',
        });
        this.router.navigateByUrl('/herramientas/dashboard');
      })
      .catch(
        async (err) =>
          await super.showToast({
            message: `Ocurrió un error al ${
              data.ACTION === 'A' ? 'aprobar' : 'rechazar'
            } la solicitud`,
            duration: 4000,
            color: 'danger',
          })
      )
      .then(async () => {
        await super.hideLoading();
      });
  }

  async confirmar(accion: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const confirmacion: HTMLIonAlertElement = await this.alertCtrl.create({
        header: `Confirmación de acción`,
        message: `¿Deseas ${accion} la solicitud?`,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => resolve(false),
          },
          {
            text: 'Sí',
            handler: () => resolve(true),
          },
        ],
      });
      await confirmacion.present();
    });
  }
}
