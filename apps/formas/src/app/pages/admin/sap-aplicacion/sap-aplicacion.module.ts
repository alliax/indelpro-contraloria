import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SapAplicacionPageRoutingModule } from './sap-aplicacion-routing.module';

import { SapAplicacionPage } from './sap-aplicacion.page';
import { IonicComponentsModule, PipesModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SapAplicacionPageRoutingModule,
    PipesModule,
    IonicComponentsModule,
  ],
  declarations: [SapAplicacionPage],
})
export class SapAplicacionPageModule {}
