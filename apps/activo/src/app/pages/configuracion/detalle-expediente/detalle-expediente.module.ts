import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleExpedientePageRoutingModule } from './detalle-expediente-routing.module';

import { DetalleExpedientePage } from './detalle-expediente.page';

import { UiPipesModule } from '@indelpro-contraloria/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleExpedientePageRoutingModule,
    UiPipesModule,
    NgxDatatableModule,
  ],
  providers: [],
  declarations: [DetalleExpedientePage],
})
export class DetalleExpedientePageModule {}
