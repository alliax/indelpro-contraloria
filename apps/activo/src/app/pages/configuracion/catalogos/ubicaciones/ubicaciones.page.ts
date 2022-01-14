import { Component, OnInit } from '@angular/core';
import { DataEntryClass, FeathersService } from '@alliax/feathers-client';
import {
  createUbicacion,
  GrupoUbicacionesQuery,
  Ubicacion,
  UbicacionesQuery,
  UbicacionesService,
} from '@indelpro-contraloria/data';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'indelpro-contraloria-ubicaciones',
  templateUrl: './ubicaciones.page.html',
  styleUrls: ['./ubicaciones.page.scss'],
})
export class UbicacionesPage
  extends DataEntryClass<Ubicacion, UbicacionesService>
  implements OnInit {
  // registros$ = this.ubicacionesQuery.agrupadas$;
  registros$ = this.ubicacionesQuery.agrupadas$;
  /*.selectAll()
    .pipe(
      map((ubicaciones) =>
        ubicaciones.sort(
          (a, b) => a.grupoUbicacion.orden - b.grupoUbicacion.orden
        )
      )
    );*/
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
        label: 'Nombre del tipo de activo',
        placeholder: 'Ingresa un nombre',
        labelPosition: 'stacked',
        required: true,
      },
      validation: {
        messages: {
          required: 'Debes ingresar el nombre del tipo de activo',
        },
      },
    },
    {
      key: 'grupoUbicacionId',
      type: 'select',
      templateOptions: {
        label: 'Grupo de Ubicación',
        placeholder: 'Seleccione el grupo al que pertenece la ubicación',
        labelPosition: 'stacked',
        required: true,
        options: this.grupoUbicaciones.selectAll().pipe(
          map((grupos) => grupos.sort((a, b) => a.orden - b.orden)),
          map((grupos) =>
            grupos.map((grupo) => ({
              label: grupo.nombre,
              value: grupo._id,
            }))
          )
        ),
      },
      validation: {
        messages: {
          required: 'Debes seleccionar el grupo al que pertenece la ubicación',
        },
      },
    },
    {
      key: 'imagen',
      type: 'input',
      className: 'form-hidden',
      templateOptions: {
        type: 'hidden',
      },
    },
  ];

  constructor(
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected feathersService: FeathersService,
    private ubicacionesQuery: UbicacionesQuery,
    private ubicacionesService: UbicacionesService,
    private grupoUbicaciones: GrupoUbicacionesQuery
  ) {
    super(
      loadingCtrl,
      toastCtrl,
      alertCtrl,
      ubicacionesService,
      feathersService,
      createUbicacion
    );
  }

  ngOnInit() {}
}
