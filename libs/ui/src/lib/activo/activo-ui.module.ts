import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedienteHeaderTarjetaComponent } from './expediente-header-tarjeta/expediente-header-tarjeta.component';
import { IonicModule } from '@ionic/angular';

const COMPONENTS = [ExpedienteHeaderTarjetaComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, IonicModule],
  exports: [...COMPONENTS],
})
export class ActivoUiModule {}
