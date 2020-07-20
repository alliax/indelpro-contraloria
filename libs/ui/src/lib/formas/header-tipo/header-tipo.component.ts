import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'indelpro-contraloria-header-tipo',
  templateUrl: './header-tipo.component.html',
  styleUrls: ['./header-tipo.component.scss'],
})
export class HeaderTipoComponent implements OnInit {
  @Input() icono: string;
  @Input() colorIcono: string;
  @Input() titulo: string;
  @Input() total: string;
  constructor() {}

  ngOnInit() {}
}
