import { Component, Input, OnInit } from '@angular/core';
import { ExpedienteDet, SapQuery } from '@indelpro-contraloria/data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { take } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'indelpro-contraloria-facturas-expediente',
  templateUrl: './facturas-expediente.page.html',
  styleUrls: ['./facturas-expediente.page.scss'],
})
export class FacturasExpedientePage implements OnInit {
  @Input() expediente: ExpedienteDet;
  facturas: any[];
  constructor(
    private http: HttpClient,
    private sapsQuery: SapQuery,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    try {
      const sapActual = await this.sapsQuery.$activa.pipe(take(1)).toPromise();
      this.facturas = await this.http
        .get<any[]>(
          `${environment.bovedaAPI}consultaAnexos/listadoAnexos/${
            sapActual.P_BUKRS
          }/${this.expediente.BELNR}/${this.expediente.BUDAT.substr(0, 4)}`
          /*`${environment.bovedaAPI}consultaAnexos/listadoAnexos/${sapActual.P_BUKRS}/5102730148/2020`*/
        )
        .toPromise();
    } catch (err) {
      console.log(err);
      this.facturas = [];
      await (
        await this.toastCtrl.create({
          message: 'Ocurrió un error al cargar las facturas',
          color: 'danger',
          duration: 4500,
        })
      ).present();
    }
  }

  async verDocumento(factura) {
    const descargando = await this.loadingCtrl.create({});
    descargando.present();
    try {
      const { nombre, tokenDescarga } = factura;
      const archivo: any = await this.http
        .get(`${environment.bovedaAPI}consultaAnexos/${tokenDescarga}`)
        .toPromise();
      const mimeType = archivo.nombre.includes('pdf')
        ? 'application/octet-stream'
        : 'text/xml';

      const base64Response = await fetch(
        `data:${mimeType};base64,${archivo.archivo}`
      );
      const blob = await base64Response.blob();

      const a = document.createElement('a');
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${nombre}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      await (
        await this.toastCtrl.create({
          message: 'Ocurrió un error al ver el documento',
          color: 'danger',
          duration: 4500,
        })
      ).present();
    } finally {
      descargando.dismiss();
    }
  }
}
