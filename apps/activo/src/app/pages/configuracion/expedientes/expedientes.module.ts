import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedientesPageRoutingModule } from './expedientes-routing.module';

import { ExpedientesPage } from './expedientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpedientesPageRoutingModule
  ],
  declarations: [ExpedientesPage]
})
export class ExpedientesPageModule {}
