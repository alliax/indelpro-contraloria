import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesPendientesPageRoutingModule } from './solicitudes-pendientes-routing.module';

import { SolicitudesPendientesPage } from './solicitudes-pendientes.page';
import { PipesModule } from '@alliax/feathers-client';
import { FormasUiModule } from '@indelpro-contraloria/ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesPendientesPageRoutingModule,
    PipesModule,
    FormasUiModule,
  ],
  declarations: [SolicitudesPendientesPage],
})
export class SolicitudesPendientesPageModule {}
