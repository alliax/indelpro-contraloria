import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoUbicacionesPageRoutingModule } from './grupo-ubicaciones-routing.module';

import { GrupoUbicacionesPage } from './grupo-ubicaciones.page';
import { IonicComponentsModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoUbicacionesPageRoutingModule,
    IonicComponentsModule,
  ],
  declarations: [GrupoUbicacionesPage],
})
export class GrupoUbicacionesPageModule {}
