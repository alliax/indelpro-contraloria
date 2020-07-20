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
      import('./pages/dashboard/dashboard.module').then(
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
        path: 'busqueda-expedientes',
        loadChildren: () =>
          import(
            './pages/herramientas/busqueda-expedientes/busqueda-expedientes.module'
          ).then((m) => m.BusquedaExpedientesPageModule),
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
