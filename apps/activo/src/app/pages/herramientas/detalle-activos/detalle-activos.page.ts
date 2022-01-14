import { Component, Input, OnInit } from '@angular/core';
import {
  Activo,
  Expediente,
  ExpedientesQuery,
  GrupoActivo,
} from '@indelpro-contraloria/data';
import { ModalController, ToastController } from '@ionic/angular';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  Observable,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { json2csvAsync } from 'json-2-csv';
import { Router } from '@angular/router';

@Component({
  selector: 'indelpro-contraloria-detalle-activos',
  templateUrl: './detalle-activos.page.html',
  styleUrls: ['./detalle-activos.page.scss'],
})
export class DetalleActivosPage implements OnInit {
  @Input() grupo: GrupoActivo;
  searchEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');
  grupoActual: BehaviorSubject<GrupoActivo> = new BehaviorSubject<GrupoActivo>(
    null
  );

  filtrados$: Observable<Activo[]> = combineLatest([
    this.grupoActual,
    this.searchEvent,
  ]).pipe(
    map((val: [GrupoActivo, string]) =>
      val[0].registros.filter(
        (registro) =>
          registro.ANLN1.toUpperCase().includes(val[1]) ||
          registro.TXT50.toUpperCase().includes(val[1])
      )
    )
  );

  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    private expedientesQuery: ExpedientesQuery,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.grupoActual.next(this.grupo);
  }

  async abrirExpediente(activo: Activo) {
    try {
      const expedienteSeleccionado = await firstValueFrom(
        this.expedientesQuery.selectAll().pipe(
          tap((val) =>
            console.log(val.filter((exp) => exp.ACT_REL.length > 0))
          ),
          map((expedientes: Expediente[]) =>
            expedientes.filter(
              (expediente: Expediente) =>
                expediente.ANLN1.trim() === activo.ANLN1.trim() ||
                expediente.ACT_REL.includes({
                  ANLN1: activo.ANLN1,
                  TXT50: activo.TXT50,
                })
            )
          ),
          map((expedientes) => (expedientes.length > 0 ? expedientes[0] : null))
        )
      );
      await this.router.navigateByUrl(
        `/herramientas/listado-expedientes/${expedienteSeleccionado._id}`
      );
      await this.modalCtrl.dismiss();
    } catch (err) {
      const error = await this.toastCtrl.create({
        message: 'El activo seleccionado no tiene un expediente en el sistema.',
        color: 'danger',
        duration: 4500,
      });
      await error.present();
    }
  }

  async descargarExcel(grupo: GrupoActivo) {
    const csvData = await json2csvAsync(
      grupo.registros.map((activo: Activo) => ({
        'Código Tipo de Activo': activo.ANLKL,
        'Tipo de Activo': activo.TPOACT,
        Activo: activo.ANLN1,
        Descripcion: activo.TXT50.concat(activo.TXA50),
        Fecha: activo.AKTIV,
        'Año de Capitalización': activo.GJAHR_CAPI,
        Monto: activo.KANSW,
      })),
      { excelBOM: true }
    );

    const blob = new Blob([...csvData], {
      type: 'text/csv;charset=utf-8',
    });
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(
        blob,
        `listadoActivos-${grupo.tipoActivo?.claveSap}-${
          grupo.tipoActivo?.nombre
        }-${new Date().toLocaleDateString()}.csv`
      );
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = `listadoActivos-${grupo.tipoActivo?.claveSap}-${
        grupo.tipoActivo?.nombre
      }-${new Date().toLocaleDateString()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

  buscar(event) {
    this.searchEvent.next(event.target.value.toString().toUpperCase());
  }
}
