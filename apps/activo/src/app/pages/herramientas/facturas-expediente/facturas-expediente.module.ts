import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasExpedientePage } from './facturas-expediente.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  declarations: [FacturasExpedientePage],
  exports: [FacturasExpedientePage],
})
export class FacturasExpedientePageModule {}
