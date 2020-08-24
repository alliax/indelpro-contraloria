import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaTipoPage } from './busqueda-tipo.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaTipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaTipoPageRoutingModule {}
