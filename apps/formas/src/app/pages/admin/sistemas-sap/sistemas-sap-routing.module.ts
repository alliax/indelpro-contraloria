import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SistemasSapPage } from './sistemas-sap.page';

const routes: Routes = [
  {
    path: '',
    component: SistemasSapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemasSapPageRoutingModule {}
