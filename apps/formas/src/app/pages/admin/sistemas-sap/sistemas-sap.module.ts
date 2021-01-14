import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SistemasSapPageRoutingModule } from './sistemas-sap-routing.module';

import { SistemasSapPage } from './sistemas-sap.page';
import { IonicComponentsModule, PipesModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SistemasSapPageRoutingModule,
    PipesModule,
    IonicComponentsModule,
  ],
  declarations: [SistemasSapPage],
})
export class SistemasSapPageModule {}
