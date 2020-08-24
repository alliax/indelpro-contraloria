import { Component, OnInit } from '@angular/core';
import { DataEntryClass, FeathersService } from '@alliax/feathers-client';
import {
  createGrupoUbicacion,
  GrupoUbicacion,
  GrupoUbicacionesQuery,
  GrupoUbicacionesService,
} from '@indelpro-contraloria/data';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-grupo-ubicaciones',
  templateUrl: './grupo-ubicaciones.page.html',
  styleUrls: ['./grupo-ubicaciones.page.scss'],
})
export class GrupoUbicacionesPage
  extends DataEntryClass<GrupoUbicacion, GrupoUbicacionesService>
  implements OnInit {
  registros$ = this.grupoUbicacionesQuery
    .selectAll()
    .pipe(map((grupos) => grupos.sort((a, b) => a.orden - b.orden)));
  model = createGrupoUbicacion({});
  fields = [
    {
      key: '_id',
      type: 'input',
      className: 'form-hidden',
      templateOptions: {
        type: 'hidden',
      },
    },
    {
      key: 'nombre',
      type: 'input',
      templateOptions: {
        label: 'Nombre del grupo de ubicación',
        placeholder: 'Ingresa un nombre',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar el nombre',
        },
      },
    },
    {
      key: 'orden',
      type: 'input',
      templateOptions: {
        label: 'Orden',
        type: 'number',
        placeholder: 'Orden',
        labelPosition: 'stacked',
        required: true,
      },
    },
  ];

  constructor(
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected feathersService: FeathersService,
    private grupoUbicacionesQuery: GrupoUbicacionesQuery,
    private grupoUbicacionesService: GrupoUbicacionesService
  ) {
    super(
      loadingCtrl,
      toastCtrl,
      alertCtrl,
      grupoUbicacionesService,
      feathersService
    );
  }

  ngOnInit() {}
}
