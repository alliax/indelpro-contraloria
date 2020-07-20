import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesEnviadasPage } from './solicitudes-enviadas.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesEnviadasPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesEnviadasPageRoutingModule {}
