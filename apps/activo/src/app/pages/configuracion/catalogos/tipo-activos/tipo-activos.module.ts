import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoActivosPageRoutingModule } from './tipo-activos-routing.module';

import { TipoActivosPage } from './tipo-activos.page';
import { PipesModule, IonicComponentsModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoActivosPageRoutingModule,
    PipesModule,
    IonicComponentsModule,
  ],
  declarations: [TipoActivosPage],
})
export class TipoActivosPageModule {}
