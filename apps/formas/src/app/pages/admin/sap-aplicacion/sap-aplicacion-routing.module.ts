import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SapAplicacionPage } from './sap-aplicacion.page';

const routes: Routes = [
  {
    path: '',
    component: SapAplicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SapAplicacionPageRoutingModule {}
