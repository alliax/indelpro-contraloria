import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudDetallePageRoutingModule } from './solicitud-detalle-routing.module';

import { SolicitudDetallePage } from './solicitud-detalle.page';
import { FormasUiModule } from '@indelpro-contraloria/ui';
import { PipesModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudDetallePageRoutingModule,
    FormasUiModule,
    PipesModule,
  ],
  declarations: [SolicitudDetallePage],
})
export class SolicitudDetallePageModule {}
