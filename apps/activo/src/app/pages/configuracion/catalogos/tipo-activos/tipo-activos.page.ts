import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService, FeathersService } from '@alliax/feathers-client';
import {
  createTipoActivo,
  TipoActivo,
} from '../../../../../../../../libs/data/src/lib/state/activo/tipo-activos/tipo-activo.model';
import { TipoActivosService } from '../../../../../../../../libs/data/src/lib/state/activo/tipo-activos/tipo-activos.service';
import { TipoActivosQuery } from '../../../../../../../../libs/data/src/lib/state/activo/tipo-activos/tipo-activos.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'indelpro-contraloria-tipo-activos',
  templateUrl: './tipo-activos.page.html',
  styleUrls: ['./tipo-activos.page.scss'],
})
export class TipoActivosPage implements OnInit {
  @ViewChild('foto', { read: ElementRef, static: false }) foto: ElementRef;
  nuevo: TipoActivo = createTipoActivo({});
  registros$: Observable<TipoActivo[]> = this.tipoActivosQuery.selectAll();
  imagen: any;
  constructor(
    private loadingCtrl: LoadingController,
    private feathersService: FeathersService,
    private tipoActivosQuery: TipoActivosQuery,
    private tipoActivos: TipoActivosService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async cargarImagen(event) {
    (await this.foto.nativeElement.getInputElement()).click();
  }

  async crear() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando registro',
    });
    try {
      await loading.present();
      console.log(this.imagen);
      if (this.imagen) {
        const uploaded = await this.feathersService.upload(this.imagen);
        this.nuevo.imagen = uploaded.id;
      }
      const result = await this.tipoActivos.create(this.nuevo);
      const toast = await this.toastCtrl.create({
        message: 'Se guardó correctamente el registro',
        duration: 4000,
        color: 'success',
      });
      await toast.present();
    } catch (err) {
      console.log(err);
      const toast = await this.toastCtrl.create({
        message: 'Ocurrió un error al guardar el registro',
        duration: 4000,
        color: 'danger',
      });
      await toast.present();
    } finally {
      await loading.dismiss();
    }
  }

  async imagenSeleccionada(file: any) {
    if (file.target.firstElementChild.files[0]) {
      this.imagen = file.target.firstElementChild.files[0];
      file.target.value = '';
    }
  }
}
