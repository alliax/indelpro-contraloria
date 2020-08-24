import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { FeathersClientModule } from '@alliax/feathers-client';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    FeathersClientModule.forRoot({
      apiUrl: environment.apiUrl,
      rootPath: environment.rootPath,
      uploadFolder: 'uploads/',
      accountPath: 'auth',
      socketConfig: {
        path: environment.socketPath,
        timeout: 240000,
      },
    }),
    NgxDatatableModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
