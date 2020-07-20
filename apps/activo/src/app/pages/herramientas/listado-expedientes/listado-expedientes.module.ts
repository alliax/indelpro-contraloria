import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoExpedientesPageRoutingModule } from './listado-expedientes-routing.module';

import { ListadoExpedientesPage } from './listado-expedientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoExpedientesPageRoutingModule
  ],
  declarations: [ListadoExpedientesPage]
})
export class ListadoExpedientesPageModule {}
