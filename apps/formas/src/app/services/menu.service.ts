import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NavMenu } from '@alliax/feathers-client';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menu: NavMenu[] = [
    {
      title: 'Herramientas',
      children: [
        {
          title: 'Dashboard',
          icon: 'speedometer-outline',
          url: '/herramientas/dashboard',
        },
      ],
    },
    {
      title: 'Configuración',
      children: [
        {
          title: 'Mi perfil',
          icon: 'person-outline',
          url: '/configuracion/mi-perfil',
        },
      ],
    },
  ];
  private menuAdmin: NavMenu[] = [
    {
      title: 'Administración',
      children: [
        {
          title: 'Usuarios',
          icon: 'people-outline',
          url: '/admin/usuarios',
        },
        {
          title: 'Tipos de Solicitudes',
          icon: 'people-outline',
          url: '/admin/tipo-solicitudes',
        },
        {
          title: 'Sistemas SAP',
          icon: 'cog-outline',
          url: '/admin/sistemas-sap',
        },
        {
          title: 'Configuración SAP aplicación',
          icon: 'cog-outline',
          url: '/admin/sap-aplicacion',
        },
      ],
    },
  ];
  constructor() {}
  getMenu(): Observable<NavMenu[]> {
    return of(this.menu);
  }
  getMenuAdmin(): Observable<NavMenu[]> {
    return of(this.menuAdmin);
  }
}
