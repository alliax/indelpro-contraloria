import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleExpedientePageRoutingModule } from './detalle-expediente-routing.module';

import { DetalleExpedientePage } from './detalle-expediente.page';

import { ActivoUiModule, UiPipesModule } from '@indelpro-contraloria/ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicComponentsModule, PipesModule } from '@alliax/feathers-client';
import { HttpClientModule } from '@angular/common/http';
import { FacturasExpedientePageModule } from '../facturas-expediente/facturas-expediente.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleExpedientePageRoutingModule,
    UiPipesModule,
    NgxDatatableModule,
    ActivoUiModule,
    PipesModule,
    IonicComponentsModule,
    FacturasExpedientePageModule,
  ],
  providers: [CurrencyPipe],
  declarations: [DetalleExpedientePage],
})
export class DetalleExpedientePageModule {}
