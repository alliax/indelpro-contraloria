import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaExpedientesPageRoutingModule } from './busqueda-expedientes-routing.module';

import { BusquedaExpedientesPage } from './busqueda-expedientes.page';
import { PipesModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaExpedientesPageRoutingModule,
    PipesModule
  ],
  declarations: [BusquedaExpedientesPage]
})
export class BusquedaExpedientesPageModule {}
