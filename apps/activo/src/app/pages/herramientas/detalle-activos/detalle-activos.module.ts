import { NgModule } from '@angular/core';
import { DetalleActivosPageRoutingModule } from './detalle-activos-routing.module';
import { DetalleActivosPage } from './detalle-activos.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DetalleActivosPageRoutingModule,
  ],
  declarations: [DetalleActivosPage],
})
export class DetalleActivosPageModule {}
