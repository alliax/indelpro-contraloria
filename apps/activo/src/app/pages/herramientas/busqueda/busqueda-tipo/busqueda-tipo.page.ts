import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Activo,
  ActivosQuery,
  createTipoActivo,
  Expediente,
  ExpedientesQuery,
  TipoActivo,
} from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-busqueda-tipo',
  templateUrl: './busqueda-tipo.page.html',
  styleUrls: ['./busqueda-tipo.page.scss'],
})
export class BusquedaTipoPage implements OnInit {
  id;
  nombre;

  porTipo$: Observable<Expediente[]> = this.expedientesQuery.selectAll().pipe(
    map((expedientes: Expediente[]) =>
      expedientes
        .filter((expediente: Expediente) =>
          expediente.TPOACT.includes(this.activated.snapshot.paramMap.get('id'))
        )
        .sort(
          (a, b) => new Date(b.AKTIV).valueOf() - new Date(a.AKTIV).valueOf()
        )
    )
  );

  loading$: Observable<boolean> = this.expedientesQuery.selectLoading();

  constructor(
    private activated: ActivatedRoute,
    private expedientesQuery: ExpedientesQuery
  ) {}

  ngOnInit() {
    this.id = this.activated.snapshot.paramMap.get('id');
    this.nombre = this.activated.snapshot.paramMap.get('nombre') || null;
  }
}
