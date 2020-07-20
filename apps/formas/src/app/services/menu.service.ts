import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menu = [
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
  constructor() {}
  getMenu() {
    return this.menu;
  }
}
