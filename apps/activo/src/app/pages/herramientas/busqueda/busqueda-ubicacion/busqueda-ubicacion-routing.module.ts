import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaUbicacionPage } from './busqueda-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaUbicacionPageRoutingModule {}
