import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { AuthGuard } from '@alliax/feathers-client';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'herramientas',
  },
  {
    path: 'herramientas',
    canActivate: [AuthGuard],
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
        path: 'solicitud/:id',
        loadChildren: () =>
          import(
            './pages/herramientas/solicitud-detalle/solicitud-detalle.module'
          ).then((m) => m.SolicitudDetallePageModule),
      },
    ],
  },
  {
    path: 'configuracion',
    canActivate: [AuthGuard],
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
