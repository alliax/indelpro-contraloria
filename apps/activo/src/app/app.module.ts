import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { FeathersClientModule } from '@alliax/feathers-client';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FeathersClientModule.forRoot({
      apiUrl: environment.apiUrl,
      rootPath: environment.rootPath,
      uploadFolder: 'uploads',
      accountPath: 'auth',
      socketConfig: {
        path: environment.socketPath,
        timeout: 120000,
      },
    }),
    NgxDatatableModule,
    IonicModule.forRoot(),
    environment.production ? [] : AkitaNgDevtools,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
