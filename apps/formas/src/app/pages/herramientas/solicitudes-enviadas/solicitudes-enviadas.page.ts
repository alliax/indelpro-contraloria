import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Solicitud,
  SolicitudesQuery,
  SolicitudesService,
} from '@indelpro-contraloria/data';
import { User, AuthQuery, BaseClass } from '@alliax/feathers-client';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'indelpro-contraloria-solicitudes-enviadas',
  templateUrl: './solicitudes-enviadas.page.html',
  styleUrls: ['./solicitudes-enviadas.page.scss'],
})
export class SolicitudesEnviadasPage extends BaseClass implements OnInit {
  solicitudes$: Observable<Solicitud[]> = this.solicitudesQuery
    .propiasPorTipoSeleccionado$;
  loading$: Observable<boolean> = this.solicitudesQuery.selectLoading();
  user$: Observable<User> = this.authQuery.selectUser$;

  constructor(
    private activated: ActivatedRoute,
    private solicitudesQuery: SolicitudesQuery,
    private authQuery: AuthQuery,
    private solicitudesService: SolicitudesService,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    private router: Router
  ) {
    super(loadingCtrl, toastCtrl, alertCtrl);
  }

  ngOnInit() {
    const clave = this.activated.snapshot.paramMap.get('clave');
    this.solicitudesService.setSolicitudesActivas(clave);
  }

  async aprobar(sliding: HTMLIonItemSlidingElement, solicitud: Solicitud) {
    await super.showLoading({
      message: 'Aprobando solicitud',
    });
    setTimeout(async () => {
      await super.hideLoading();
      sliding.close();
    }, 2500);
  }

  async verDetalle(solicitud: Solicitud) {
    this.router.navigateByUrl(`/herramientas/solicitud/${solicitud.IDWF}`);
  }

  buscar(event) {
    this.solicitudesService.setBusqueda(event.target.value);
  }
}
