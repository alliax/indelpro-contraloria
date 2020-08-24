import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionExpedientesPageRoutingModule } from './informacion-expedientes-routing.module';

import { InformacionExpedientesPage } from './informacion-expedientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionExpedientesPageRoutingModule
  ],
  declarations: [InformacionExpedientesPage]
})
export class InformacionExpedientesPageModule {}
