import { Component, OnInit } from '@angular/core';
import {
  TipoActivosQuery,
  Ubicacion,
  UbicacionesQuery,
} from '@indelpro-contraloria/data';
import { TipoActivo } from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'indelpro-contraloria-busqueda-expedientes',
  templateUrl: './busqueda-expedientes.page.html',
  styleUrls: ['./busqueda-expedientes.page.scss'],
})
export class BusquedaExpedientesPage implements OnInit {
  tipos$: Observable<TipoActivo[]> = this.tipoActivosQuery.selectAll();
  ubicaciones$: Observable<Ubicacion[]> = this.ubicacionesQuery.agrupadas$;

  query = {
    activo: null,
    sai: null,
    desde: null,
    hasta: null,
  };

  constructor(
    private tipoActivosQuery: TipoActivosQuery,
    private ubicacionesQuery: UbicacionesQuery,
    private router: Router
  ) {}

  ngOnInit() {}

  async buscarPorDatos() {
    await this.router.navigate(['/', 'herramientas', 'busqueda', 'datos'], {
      queryParams: {
        query: JSON.stringify(this.query),
      },
    });
  }
}
