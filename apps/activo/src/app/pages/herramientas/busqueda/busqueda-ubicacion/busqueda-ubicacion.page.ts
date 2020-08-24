import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Activo,
  ActivosQuery,
  Expediente,
  ExpedientesQuery,
} from '@indelpro-contraloria/data';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'indelpro-contraloria-busqueda-ubicacion',
  templateUrl: './busqueda-ubicacion.page.html',
  styleUrls: ['./busqueda-ubicacion.page.scss'],
})
export class BusquedaUbicacionPage implements OnInit {
  id;
  nombre;

  porUbicacion$: Observable<
    Expediente[]
  > = this.expedientesQuery.selectAll().pipe(
    map((expedientes: Expediente[]) =>
      expedientes
        .filter(
          (expediente: Expediente) => false
          // expediente.TPOACT.includes(this.activated.snapshot.paramMap.get('id'))
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
    this.nombre = this.activated.snapshot.paramMap.get('nombre');
  }
}
