import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionExpedientesPage } from './informacion-expedientes.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionExpedientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionExpedientesPageRoutingModule {}
