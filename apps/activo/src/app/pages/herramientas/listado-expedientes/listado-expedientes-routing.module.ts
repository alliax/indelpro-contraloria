import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoExpedientesPage } from './listado-expedientes.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoExpedientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoExpedientesPageRoutingModule {}
