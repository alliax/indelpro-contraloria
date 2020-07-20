import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesEnviadasPageRoutingModule } from './solicitudes-enviadas-routing.module';
import { SolicitudesEnviadasPage } from './solicitudes-enviadas.page';
import { PipesModule } from '@alliax/feathers-client';
import { FormasUiModule } from '@indelpro-contraloria/ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesEnviadasPageRoutingModule,
    PipesModule,
    FormasUiModule,
  ],
  declarations: [SolicitudesEnviadasPage],
})
export class SolicitudesEnviadasPageModule {}
