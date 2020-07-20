import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'indelpro-contraloria-lista-tipo',
  templateUrl: './lista-tipo.component.html',
  styleUrls: ['./lista-tipo.component.scss'],
})
export class ListaTipoComponent implements OnInit {
  @Input() tipo: any;
  constructor() {}

  ngOnInit() {}
}
