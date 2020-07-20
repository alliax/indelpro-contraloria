import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaExpedientesPage } from './busqueda-expedientes.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaExpedientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaExpedientesPageRoutingModule {}
