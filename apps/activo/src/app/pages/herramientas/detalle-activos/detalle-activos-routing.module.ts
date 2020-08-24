import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleActivosPage } from './detalle-activos.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleActivosPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleActivosPageRoutingModule {}
