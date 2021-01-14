import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoSolicitudesPageRoutingModule } from './tipo-solicitudes-routing.module';

import { TipoSolicitudesPage } from './tipo-solicitudes.page';
import { IonicComponentsModule, PipesModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoSolicitudesPageRoutingModule,
    PipesModule,
    IonicComponentsModule
  ],
  declarations: [TipoSolicitudesPage],
})
export class TipoSolicitudesPageModule {}
