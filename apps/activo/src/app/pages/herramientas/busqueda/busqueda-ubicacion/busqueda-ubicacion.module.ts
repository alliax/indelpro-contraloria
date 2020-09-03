import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaUbicacionPageRoutingModule } from './busqueda-ubicacion-routing.module';

import { BusquedaUbicacionPage } from './busqueda-ubicacion.page';
import { ActivoUiModule } from '@indelpro-contraloria/ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaUbicacionPageRoutingModule,
    ActivoUiModule,
  ],
  declarations: [BusquedaUbicacionPage],
})
export class BusquedaUbicacionPageModule {}
