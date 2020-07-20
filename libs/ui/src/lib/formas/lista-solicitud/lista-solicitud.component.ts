import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Solicitud } from '@indelpro-contraloria/data';

@Component({
  selector: 'indelpro-contraloria-lista-solicitud',
  templateUrl: './lista-solicitud.component.html',
  styleUrls: ['./lista-solicitud.component.scss'],
})
export class ListaSolicitudComponent implements OnInit {
  @Input() solicitud: Solicitud;
  @Output() detalle: EventEmitter<Solicitud> = new EventEmitter();
  @Output() aprobar: EventEmitter<
    HTMLIonItemSlidingElement
  > = new EventEmitter();
  @Output() rechazar: EventEmitter<
    HTMLIonItemSlidingElement
  > = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
