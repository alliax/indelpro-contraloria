import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Solicitud,
  SolicitudesQuery,
  SolicitudesService,
  Tipo,
  TiposQuery,
  TiposService,
} from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';
import { AuthQuery, User } from '@alliax/feathers-client';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'indelpro-contraloria-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  solicitudes$: Observable<Solicitud[]> = this.solicitudesQuery.filtradas$;
  loading$: Observable<boolean> = this.solicitudesQuery.selectLoading();
  user$: Observable<User> = this.authQuery.selectUser$;
  tipos$: Observable<Tipo[]> = this.tiposQuery.selectAll();
  pendientesPorTipo$: Observable<any> = this.solicitudesQuery
    .pendientesPorTipo$;
  propiasPorTipo$: Observable<any> = this.solicitudesQuery.propiasPorTipo$;

  pendientesVisible = false;
  enviadasVisible = false;
  indelproPendientesVisible = false;

  constructor(
    public solicitudesQuery: SolicitudesQuery,
    private authQuery: AuthQuery,
    private solicitudesService: SolicitudesService,
    private tiposQuery: TiposQuery,
    private tiposService: TiposService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async update(event) {
    try {
      await this.solicitudesService.singleLoad();
      await (
        await this.toastCtrl.create({
          message:
            'Se actualizaron exitosamente las solicitudes pendientes de aprobar',
          duration: 4500,
          color: 'success',
        })
      ).present();
    } catch (err) {
      await (
        await this.toastCtrl.create({
          message: 'Ocurrió un error al actualizar las solicitudes',
          duration: 4500,
          color: 'danger',
        })
      ).present();
      console.log(err);
    } finally {
      event.target.complete();
    }
  }

  async buscar(event) {
    await this.solicitudesService.setBusqueda(event.target.value);
  }
}
