import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoSolicitudesPage } from './tipo-solicitudes.page';

const routes: Routes = [
  {
    path: '',
    component: TipoSolicitudesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoSolicitudesPageRoutingModule {}
