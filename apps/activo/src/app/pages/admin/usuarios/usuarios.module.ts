import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { IonicComponentsModule, PipesModule } from '@alliax/feathers-client';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    IonicComponentsModule,
    PipesModule,
  ],
  declarations: [UsuariosPage],
})
export class UsuariosPageModule {}
