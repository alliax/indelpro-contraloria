import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { AuthGuard, VerifyGuard } from '@alliax/feathers-client';
import { HasRoleGuard } from '@indelpro-contraloria/ui';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'herramientas',
  },
  {
    path: 'herramientas',
    canActivate: [AuthGuard, VerifyGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/herramientas/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: 'solicitudes/pendientes/:clave',
        loadChildren: () =>
          import(
            './pages/herramientas/solicitudes-pendientes/solicitudes-pendientes.module'
          ).then((m) => m.SolicitudesPendientesPageModule),
      },
      {
        path: 'solicitudes/enviadas/:clave',
        loadChildren: () =>
          import(
            './pages/herramientas/solicitudes-enviadas/solicitudes-enviadas.module'
          ).then((m) => m.SolicitudesEnviadasPageModule),
      },
      {
        path: 'solicitud/:id/:proceso',
        loadChildren: () =>
          import(
            './pages/herramientas/solicitud-detalle/solicitud-detalle.module'
          ).then((m) => m.SolicitudDetallePageModule),
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
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, VerifyGuard, HasRoleGuard],
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
        path: 'tipo-solicitudes',
        loadChildren: () =>
          import('./pages/admin/tipo-solicitudes/tipo-solicitudes.module').then(
            (m) => m.TipoSolicitudesPageModule
          ),
      },
      {
        path: 'sistemas-sap',
        loadChildren: () =>
          import('./pages/admin/sistemas-sap/sistemas-sap.module').then(
            (m) => m.SistemasSapPageModule
          ),
      },
      {
        path: 'sap-aplicacion',
        loadChildren: () =>
          import('./pages/admin/sap-aplicacion/sap-aplicacion.module').then(
            (m) => m.SapAplicacionPageModule
          ),
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
  providers: [HasRoleGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
