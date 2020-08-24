import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleActivosPageRoutingModule } from './detalle-activos-routing.module';

import { DetalleActivosPage } from './detalle-activos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleActivosPageRoutingModule,
  ],
  declarations: [DetalleActivosPage],
})
export class DetalleActivosPageModule {}
