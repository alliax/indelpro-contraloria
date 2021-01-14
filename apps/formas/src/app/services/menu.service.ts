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
  private menuAdmin = [
    {
      title: 'Administración',
      role: 'formas-admin',
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
  getMenu() {
    return this.menu;
  }
  getMenuAdmin() {
    return this.menuAdmin;
  }
}
