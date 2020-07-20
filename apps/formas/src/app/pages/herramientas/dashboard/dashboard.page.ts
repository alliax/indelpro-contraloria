import { Component, OnInit } from '@angular/core';
import {
  SolicitudesQuery,
  Solicitud,
  SolicitudesService,
  TiposQuery,
  Tipo,
  createSolicitud,
  createTipo,
  TiposService,
  DocumentosService, createDocumento
} from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';
import { User, AuthQuery, FeathersService } from '@alliax/feathers-client';

@Component({
  selector: 'indelpro-contraloria-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
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

  constructor(
    public solicitudesQuery: SolicitudesQuery,
    private authQuery: AuthQuery,
    private solicitudesService: SolicitudesService,
    private tiposQuery: TiposQuery,
  ) {}
  ngOnInit() {}

  update(event) {
    this.solicitudesService.singleLoad().then(() => event.target.complete());
  }
  buscar(event) {
    this.solicitudesService.setBusqueda(event.target.value);
  }
  /*loadTipos() {
    const documentos = [
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'DEF',
        nombre: 'Definitivas',
      },
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'AD',
        nombre: 'Provisional',
      },
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'PA',
        nombre: 'Anticipo Proveedor',
      },
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'TS',
        nombre: 'Servicio de Viaje',
      },
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'AS',
        nombre: 'Anticipo de Sueldo',
      },
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'FQ',
        nombre: 'Finiquito',
      },
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'PR',
        nombre: 'Préstamo',
      },
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'PL',
        nombre: 'Pagos Logística',
      },
      {
        tipoId: '5ef4bb3173576f24cc460749',
        clave: 'RT',
        nombre: 'Pago Retenciones',
      },
      {
        tipoId: '5ef4bb3173576f24cc46074a',
        clave: 'CVG',
        nombre: 'Gastos de Viaje',
      },
      {
        tipoId: '5ef4bb3173576f24cc46074b',
        clave: 'CG',
        nombre: 'Comprobación de Gastos',
      },
      {
        tipoId: '5ef4bb3173576f24cc46074c',
        clave: 'FON',
        nombre: 'Autorizacion de Fondos',
      },
      {
        tipoId: '5ef4bb3173576f24cc46074d',
        clave: 'ACC',
        nombre: 'Notas de Cargo / Crédito',
      },
      {
        tipoId: '5ef4bb3173576f24cc46074e',
        clave: 'CLI',
        nombre: 'Movimiento de Clientes',
      },
      {
        tipoId: '5ef4bb3173576f24cc46074f',
        clave: 'ALC',
        nombre: 'Líneas de Crédito',
      },
      {
        tipoId: '5ef4bb3173576f24cc460750',
        clave: 'SUP',
        nombre: 'Movimiento de Proveedores',
      },
      {
        tipoId: '5ef4bb3173576f24cc460751',
        clave: 'PRO',
        nombre: 'Provisiones',
      },
      {
        tipoId: '5ef4bb3173576f24cc460752',
        clave: 'DM',
        nombre: 'Documentos Manuales',
      },
      {
        tipoId: '5ef4bb3173576f24cc460753',
        clave: 'SV',
        nombre: 'Solicitud de Vacaciones',
      },
      {
        tipoId: '5ef4bb3173576f24cc460753',
        clave: 'CV',
        nombre: 'Cancelación de Vacaciones',
      },
    ];
    documentos.forEach((documento) => this.documentosService.add(createDocumento(documento)))
  }*/
}
