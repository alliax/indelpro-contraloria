import { Component, Input, OnInit } from '@angular/core';
import { ExpedienteHeader } from '@indelpro-contraloria/data';

@Component({
  selector: 'indelpro-contraloria-expediente-header-tarjeta',
  templateUrl: './expediente-header-tarjeta.component.html',
  styleUrls: ['./expediente-header-tarjeta.component.scss'],
})
export class ExpedienteHeaderTarjetaComponent implements OnInit {
  @Input() header: ExpedienteHeader;
  constructor() {}
  ngOnInit() {}
}
