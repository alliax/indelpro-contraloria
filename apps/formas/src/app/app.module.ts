import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import {
  FeathersClientModule,
  IonicComponentsModule,
} from '@alliax/feathers-client';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeMX);
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
      uploadFolder: 'uploads',
      accountPath: 'auth',
      socketConfig: {
        path: environment.socketPath,
        timeout: 60000,
      },
    }),
    /*ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),*/
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    IonicComponentsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
