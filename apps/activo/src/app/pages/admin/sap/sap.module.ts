import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SapPageRoutingModule } from './sap-routing.module';

import { SapPage } from './sap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SapPageRoutingModule
  ],
  declarations: [SapPage]
})
export class SapPageModule {}
