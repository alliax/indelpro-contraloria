import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoActivosPage } from './tipo-activos.page';

const routes: Routes = [
  {
    path: '',
    component: TipoActivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoActivosPageRoutingModule {}
