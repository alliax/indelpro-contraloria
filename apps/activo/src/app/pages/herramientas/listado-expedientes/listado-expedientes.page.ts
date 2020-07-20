import { Component, OnInit } from '@angular/core';
import {
  Expediente,
  ExpedientesService,
  ExpedientesQuery,
} from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-listado-expedientes',
  templateUrl: './listado-expedientes.page.html',
  styleUrls: ['./listado-expedientes.page.scss'],
})
export class ListadoExpedientesPage implements OnInit {
  expedientes$: Observable<Expediente[]> = this.expedientesQuery.paginados$;
  totalExpedientes$: Observable<
    number
  > = this.expedientesQuery
    .selectCount()
    .pipe(map((val) => Math.ceil(val / 10)));
  paginaActual$: Observable<number> = this.expedientesQuery.select(
    (state) => state.ui.page
  );
  constructor(
    private expedientesQuery: ExpedientesQuery,
    private expedientesService: ExpedientesService
  ) {}

  ngOnInit() {}

  avanzarPagina() {
    this.expedientesService.cambiarPagina(1);
  }
  regresarPagina() {
    this.expedientesService.cambiarPagina(-1);
  }
}
