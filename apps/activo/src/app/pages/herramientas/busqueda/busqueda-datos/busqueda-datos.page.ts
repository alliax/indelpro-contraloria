import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Activo,
  ActivosQuery,
  Expediente,
  ExpedientesQuery,
} from '@indelpro-contraloria/data';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'indelpro-contraloria-busqueda-datos',
  templateUrl: './busqueda-datos.page.html',
  styleUrls: ['./busqueda-datos.page.scss'],
})
export class BusquedaDatosPage implements OnInit {
  porDatos$: Observable<Expediente[]> = this.expedientesQuery.selectAll().pipe(
    map((expedientes: Expediente[]) => {
      const query: {
        activo: null;
        sai: null;
        desde: null;
        hasta: null;
      } = JSON.parse(this.activated.snapshot.queryParamMap.get('query'));

      return expedientes
        .filter((expediente: Expediente) =>
          query.activo ? expediente.ANLN1.includes(query.activo) : true
        ) // ANLN1 activo
        .filter((expediente: Expediente) =>
          query.sai ? expediente.PROJK.includes(query.sai) : true
        ) // PROJK SAI
        .filter((expediente: Expediente) =>
          query.desde
            ? new Date(expediente.AKTIV).valueOf() >=
              new Date(query.desde).valueOf()
            : true
        ) // AKTIV desde
        .filter((expediente: Expediente) =>
          query.hasta
            ? new Date(expediente.AKTIV).valueOf() <=
              new Date(query.hasta).valueOf()
            : true
        ) // AKTIV hasta
        .sort(
          (a, b) => new Date(b.AKTIV).valueOf() - new Date(a.AKTIV).valueOf()
        );
    })
  );

  loading$: Observable<boolean> = this.expedientesQuery.selectLoading();

  constructor(
    private activated: ActivatedRoute,
    private expedientesQuery: ExpedientesQuery
  ) {}

  ngOnInit() {}
}
