import { Component, OnInit } from '@angular/core';
import {
  Usuario,
  UsuariosService,
  UsuariosQuery
} from '@indelpro-contraloria/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'indelpro-contraloria-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss']
})
export class UsuariosPage implements OnInit {
  usuarios$: Observable<Usuario[]> = this.usuariosQuery.selectAll();
  constructor(private usuariosQuery: UsuariosQuery) {}

  ngOnInit() {}
}
