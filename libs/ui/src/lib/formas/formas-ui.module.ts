import { NgModule } from '@angular/core';
import { HeaderPageComponent } from './header-page/header-page.component';
import { HeaderTipoComponent } from './header-tipo/header-tipo.component';
import { ListaTipoComponent } from './lista-tipo/lista-tipo.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaSolicitudComponent } from './lista-solicitud/lista-solicitud.component';
import { CargandoSolicitudesComponent } from './cargando-solicitudes/cargando-solicitudes.component';
import { UiPipesModule } from '../pipes/ui-pipes.module';

const COMPONENTS = [
  HeaderPageComponent,
  HeaderTipoComponent,
  ListaTipoComponent,
  ListaSolicitudComponent,
  CargandoSolicitudesComponent,
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, UiPipesModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [],
})
export class FormasUiModule {}
