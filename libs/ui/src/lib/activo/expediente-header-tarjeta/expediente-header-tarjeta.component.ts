import { Component, Input, OnInit } from '@angular/core';
import { ExpedienteActRel, ExpedienteHeader } from '@indelpro-contraloria/data';
import { json2csvAsync } from 'json-2-csv';

@Component({
  selector: 'indelpro-contraloria-expediente-header-tarjeta',
  templateUrl: './expediente-header-tarjeta.component.html',
  styleUrls: ['./expediente-header-tarjeta.component.scss'],
})
export class ExpedienteHeaderTarjetaComponent implements OnInit {
  @Input() header: ExpedienteHeader;
  @Input() activos: ExpedienteActRel[];
  mostrarActivosRelacionados = false;
  constructor() {}
  ngOnInit() {}

  async descargarActivos() {
    const activos: ExpedienteActRel[] = [];
    activos.push(
      {
        ANLN1: this.header.ANLN1,
        TXT50: this.header.TXT501,
      },
      {
        ANLN1: this.header.ANLN2,
        TXT50: this.header.TXT502,
      }
    );
    activos.push(...this.activos);
    const csvData = await json2csvAsync(
      activos.map((activo) => ({
        Expediente: this.header.POSID,
        Activo: activo.ANLN1,
        Descripcion: activo.TXT50,
      })),
      { excelBOM: true }
    );

    const blob = new Blob([...csvData], {
      type: 'text/csv',
    });
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(
        blob,
        `listadoActivos-${this.header.POSID}-${new Date().toLocaleDateString()}`
      );
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = `listadoActivos-${
        this.header.POSID
      }-${new Date().toLocaleDateString()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
}
