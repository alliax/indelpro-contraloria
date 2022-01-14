import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import {
  Activo,
  ActivosQuery,
  Expediente,
  ExpedientesQuery,
} from '@indelpro-contraloria/data';
import {
  combineLatest,
  filter,
  map,
  merge,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'indelpro-contraloria-busqueda-datos',
  templateUrl: './busqueda-datos.page.html',
  styleUrls: ['./busqueda-datos.page.scss'],
})
export class BusquedaDatosPage implements OnInit {
  porDatos$: Observable<Expediente[]> = this.activated.queryParamMap.pipe(
    map((paramMap) => paramMap.get('query')),
    map((query) => JSON.parse(query)),
    switchMap((query) =>
      this.expedientesQuery.selectAll().pipe(
        /*tap((val) => console.log(query)),
        tap((val) => console.log(val)),*/
        map((expedientes) => {
          return expedientes.filter(
            (expediente) =>
              (query.activo ? expediente.ANLN1.includes(query.activo) : true) &&
              (query.sai ? expediente.PROJK.includes(query.sai) : true) &&
              (query.desde
                ? new Date(expediente.AKTIV).valueOf() >=
                  new Date(query.desde).valueOf()
                : true) &&
              (query.hasta
                ? new Date(expediente.AKTIV).valueOf() <=
                  new Date(query.hasta).valueOf()
                : true)
          );
        })
      )
    )
  );

  loading$: Observable<boolean> = this.expedientesQuery.selectLoading();

  constructor(
    private activated: ActivatedRoute,
    private expedientesQuery: ExpedientesQuery
  ) {}

  ngOnInit() {}
}
