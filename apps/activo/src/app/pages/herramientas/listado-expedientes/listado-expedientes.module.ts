import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoExpedientesPageRoutingModule } from './listado-expedientes-routing.module';

import { ListadoExpedientesPage } from './listado-expedientes.page';
import { ActivoUiModule } from '@indelpro-contraloria/ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoExpedientesPageRoutingModule,
    ActivoUiModule,
  ],
  declarations: [ListadoExpedientesPage],
})
export class ListadoExpedientesPageModule {}
