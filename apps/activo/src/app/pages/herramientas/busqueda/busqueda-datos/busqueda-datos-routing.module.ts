import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaDatosPage } from './busqueda-datos.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaDatosPageRoutingModule {}
