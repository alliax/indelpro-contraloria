import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SapPageRoutingModule } from './sap-routing.module';

import { SapPage } from './sap.page';
import { IonicComponentsModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SapPageRoutingModule,
    IonicComponentsModule,
  ],
  declarations: [SapPage],
})
export class SapPageModule {}
