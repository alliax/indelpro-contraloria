//todo(roth):

import { Component, OnInit } from '@angular/core';
import {
  Expediente,
  ExpedientesService,
  ExpedientesQuery,
  GrupoActivo,
} from '@indelpro-contraloria/data';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  Observable,
} from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-listado-expedientes',
  templateUrl: './listado-expedientes.page.html',
  styleUrls: ['./listado-expedientes.page.scss'],
})
export class ListadoExpedientesPage implements OnInit {
  loading$: Observable<boolean> = this.expedientesQuery.selectLoading();
  expedientes$: Observable<Expediente[]> = this.expedientesQuery.paginados$;
  searchEvent$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  resultados$: Observable<Expediente[]> = combineLatest([
    this.expedientesQuery.selectAll(),
    this.searchEvent$,
  ]).pipe(
    filter(
      (val: [Expediente[], string]) => val[1].length > 2 || val[1].length === 0
    ),
    map((val: [Expediente[], string]) =>
      val[1].length === 0
        ? []
        : val[0]
            .filter(
              (expediente) =>
                expediente.ANLN1.toUpperCase().includes(val[1]) ||
                expediente.TXT50.toUpperCase().includes(val[1]) ||
                expediente.NAME1.toUpperCase().includes(val[1]) ||
                expediente.PROJK.toUpperCase().includes(val[1])
            )
            .slice(0, 4)
    )
  );

  totalExpedientes$: Observable<number> = this.expedientesQuery
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

  buscar(event) {
    this.searchEvent$.next(event.target.value.toString().toUpperCase());
  }

  avanzarPagina() {
    this.expedientesService.cambiarPagina(1);
  }
  regresarPagina() {
    this.expedientesService.cambiarPagina(-1);
  }

  async cambiarPagina(pagina) {
    await this.expedientesService.setPage(pagina);
  }
  async irInicioPagina() {
    this.expedientesService.setPage(1);
  }
  async irFinPagina() {
    const total = await firstValueFrom(this.expedientesQuery.total$);
    const limit = await firstValueFrom(this.expedientesQuery.limit$);
    this.expedientesService.setPage(Math.ceil(total / limit));
  }
}
