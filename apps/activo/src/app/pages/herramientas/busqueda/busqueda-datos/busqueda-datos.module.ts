import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaDatosPageRoutingModule } from './busqueda-datos-routing.module';

import { BusquedaDatosPage } from './busqueda-datos.page';
import { ActivoUiModule } from '@indelpro-contraloria/ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaDatosPageRoutingModule,
    ActivoUiModule,
  ],
  declarations: [BusquedaDatosPage],
})
export class BusquedaDatosPageModule {}
