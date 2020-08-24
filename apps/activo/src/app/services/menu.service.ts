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
          url: '/dashboard',
        },
        {
          title: 'Listado de Expedientes',
          icon: 'document-text-outline',
          url: '/herramientas/listado-expedientes',
        },
        {
          title: 'Búsqueda de Expedientes',
          icon: 'search-outline',
          url: '/herramientas/busqueda',
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
        {
          title: 'Expedientes',
          icon: 'document-text-outline',
          url: '/configuracion/expedientes',
        },
        {
          title: 'Información de Expedientes',
          icon: 'document-attach-outline',
          url: '/configuracion/informacion-de-expedientes',
        },
      ],
    },
    {
      title: 'Catálogos',
      children: [
        {
          title: 'Tipo de activos',
          icon: 'cog-outline',
          url: '/configuracion/catalogos/tipo-activos',
        },
        {
          title: 'Grupo de Ubicaciones',
          icon: 'cog-outline',
          url: '/configuracion/catalogos/grupo-ubicaciones',
        },
        {
          title: 'Ubicaciones',
          icon: 'cog-outline',
          url: '/configuracion/catalogos/ubicaciones',
        },
      ],
    },
    {
      title: 'Administración del sistema',
      children: [
        {
          title: 'Usuarios del sistema',
          icon: 'person-circle-outline',
          url: '/admin/usuarios',
        },
        {
          title: 'Configuración de SAP',
          icon: 'cog',
          url: '/admin/sap',
        },
      ],
    },
  ];
  constructor() {}
  getMenu() {
    return this.menu;
  }
}
