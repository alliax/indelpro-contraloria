import { Component, OnInit } from '@angular/core';
import { AuthQuery, User } from '@alliax/feathers-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'indelpro-contraloria-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  user$: Observable<User> = this.authQuery.selectUser$;

  constructor(private authQuery: AuthQuery) {}

  ngOnInit() {}
}
