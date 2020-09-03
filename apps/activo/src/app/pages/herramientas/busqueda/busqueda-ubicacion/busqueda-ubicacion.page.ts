import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Activo,
  ActivosQuery,
  Expediente,
  ExpedientesQuery,
} from '@indelpro-contraloria/data';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'indelpro-contraloria-busqueda-ubicacion',
  templateUrl: './busqueda-ubicacion.page.html',
  styleUrls: ['./busqueda-ubicacion.page.scss'],
})
export class BusquedaUbicacionPage implements OnInit {
  id;
  nombre;

  porUbicacion$: Observable<Expediente[]> = this.activated.paramMap.pipe(
    map((paramMap: ParamMap) => paramMap.get('id')),
    switchMap((id: string) =>
      this.expedientesQuery
        .selectAll()
        .pipe(
          map((expedientes: Expediente[]) =>
            expedientes
              .filter((expediente: Expediente) => expediente.ubicacionId === id)
              .sort(
                (a, b) =>
                  new Date(b.AKTIV).valueOf() - new Date(a.AKTIV).valueOf()
              )
          )
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
