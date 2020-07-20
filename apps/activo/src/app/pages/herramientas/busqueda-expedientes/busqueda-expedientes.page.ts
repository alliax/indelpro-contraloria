import { Component, OnInit } from '@angular/core';
import { TipoActivosQuery } from '@indelpro-contraloria/data';
import { TipoActivo } from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'indelpro-contraloria-busqueda-expedientes',
  templateUrl: './busqueda-expedientes.page.html',
  styleUrls: ['./busqueda-expedientes.page.scss'],
})
export class BusquedaExpedientesPage implements OnInit {
  tipos$: Observable<TipoActivo[]> = this.tipoActivosQuery.selectAll();
  constructor(private tipoActivosQuery: TipoActivosQuery) {}

  ngOnInit() {}
}
