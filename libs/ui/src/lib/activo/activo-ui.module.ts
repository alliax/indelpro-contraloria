import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedienteHeaderTarjetaComponent } from './expediente-header-tarjeta/expediente-header-tarjeta.component';
import { IonicModule } from '@ionic/angular';
import { ExpedienteListaElementoComponent } from './expediente-lista-elemento/expediente-lista-elemento.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  ExpedienteHeaderTarjetaComponent,
  ExpedienteListaElementoComponent,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [...COMPONENTS],
})
export class ActivoUiModule {}
