import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleExpedientePage } from './detalle-expediente.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleExpedientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleExpedientePageRoutingModule {}
