import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard, VerifyGuard } from '@alliax/feathers-client';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard, VerifyGuard],
    loadChildren: () =>
      import('./pages/herramientas/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'herramientas',
    canActivate: [AuthGuard, VerifyGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listado-expedientes',
      },
      {
        path: 'listado-expedientes',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                './pages/herramientas/listado-expedientes/listado-expedientes.module'
              ).then((m) => m.ListadoExpedientesPageModule),
          },
          {
            path: ':expedienteId',
            loadChildren: () =>
              import(
                './pages/configuracion/detalle-expediente/detalle-expediente.module'
              ).then((m) => m.DetalleExpedientePageModule),
          },
        ],
      },
      {
        path: 'busqueda',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () =>
              import(
                './pages/herramientas/busqueda-expedientes/busqueda-expedientes.module'
              ).then((m) => m.BusquedaExpedientesPageModule),
          },
          {
            path: 'tipo/:id/:nombre',
            loadChildren: () =>
              import(
                './pages/herramientas/busqueda/busqueda-tipo/busqueda-tipo.module'
              ).then((m) => m.BusquedaTipoPageModule),
          },
          {
            path: 'ubicacion/:id/:nombre',
            loadChildren: () =>
              import(
                './pages/herramientas/busqueda/busqueda-ubicacion/busqueda-ubicacion.module'
              ).then((m) => m.BusquedaUbicacionPageModule),
          },
          {
            path: 'datos',
            loadChildren: () =>
              import(
                './pages/herramientas/busqueda/busqueda-datos/busqueda-datos.module'
              ).then((m) => m.BusquedaDatosPageModule),
          },
        ],
      },
    ],
  },
  {
    path: 'configuracion',
    canActivate: [AuthGuard, VerifyGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mi-perfil',
      },
      {
        path: 'mi-perfil',
        loadChildren: () =>
          import('./pages/configuracion/mi-perfil/mi-perfil.module').then(
            (m) => m.MiPerfilPageModule
          ),
      },
      {
        path: 'expedientes',
        loadChildren: () =>
          import('./pages/configuracion/expedientes/expedientes.module').then(
            (m) => m.ExpedientesPageModule
          ),
      },
      {
        path: 'catalogos',
        children: [
          {
            path: 'tipo-activos',
            loadChildren: () =>
              import(
                './pages/configuracion/catalogos/tipo-activos/tipo-activos.module'
              ).then((m) => m.TipoActivosPageModule),
          },
          {
            path: 'ubicaciones',
            loadChildren: () =>
              import(
                './pages/configuracion/catalogos/ubicaciones/ubicaciones.module'
              ).then((m) => m.UbicacionesPageModule),
          },
          {
            path: 'grupo-ubicaciones',
            loadChildren: () =>
              import(
                './pages/configuracion/catalogos/grupo-ubicaciones/grupo-ubicaciones.module'
              ).then((m) => m.GrupoUbicacionesPageModule),
          },
        ],
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, VerifyGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'usuarios',
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/admin/usuarios/usuarios.module').then(
            (m) => m.UsuariosPageModule
          ),
      },
      {
        path: 'sap',
        loadChildren: () =>
          import('./pages/admin/sap/sap.module').then((m) => m.SapPageModule),
      },
    ],
  },
  {
    path: 'detalle-activos',
    loadChildren: () =>
      import(
        './pages/herramientas/detalle-activos/detalle-activos.module'
      ).then((m) => m.DetalleActivosPageModule),
  },
  {
    path: 'informacion-expedientes',
    loadChildren: () => import('./pages/configuracion/informacion-expedientes/informacion-expedientes.module').then( m => m.InformacionExpedientesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
