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
    private tiposService: TiposService
  ) {}
  ngOnInit() {}

  update(event) {
    this.solicitudesService.singleLoad().then(() => event.target.complete());
  }
  buscar(event) {
    this.solicitudesService.setBusqueda(event.target.value);
  }
}
