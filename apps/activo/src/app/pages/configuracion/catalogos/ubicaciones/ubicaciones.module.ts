import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionesPageRoutingModule } from './ubicaciones-routing.module';

import { UbicacionesPage } from './ubicaciones.page';
import { IonicComponentsModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionesPageRoutingModule,
    IonicComponentsModule,
  ],
  declarations: [UbicacionesPage],
})
export class UbicacionesPageModule {}
