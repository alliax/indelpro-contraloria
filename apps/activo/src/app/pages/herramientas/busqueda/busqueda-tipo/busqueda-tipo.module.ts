import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaTipoPageRoutingModule } from './busqueda-tipo-routing.module';

import { BusquedaTipoPage } from './busqueda-tipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaTipoPageRoutingModule
  ],
  declarations: [BusquedaTipoPage]
})
export class BusquedaTipoPageModule {}
