import { Component, Input, OnInit } from '@angular/core';
import { Expediente } from '@indelpro-contraloria/data';

@Component({
  selector: 'indelpro-contraloria-expediente-lista-elemento',
  templateUrl: './expediente-lista-elemento.component.html',
  styleUrls: ['./expediente-lista-elemento.component.scss'],
})
export class ExpedienteListaElementoComponent implements OnInit {
  @Input() expediente: Expediente;
  constructor() {}

  ngOnInit() {}
}
