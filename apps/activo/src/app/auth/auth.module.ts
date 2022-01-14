import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from '@alliax/feathers-client';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./forgot-password/forgot-password.module').then(
            m => m.ForgotPasswordPageModule
          )
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./change-password/change-password.module').then(
            m => m.ChangePasswordPageModule
          )
      },
      {
        path: 'verify-account',
        canActivate: [IsLoggedInGuard],
        loadChildren: () =>
          import('./verify-account/verify-account.module').then(
            m => m.VerifyAccountPageModule
          )
      },
      {
        path: 'not-verified',
        canActivate: [IsLoggedInGuard],
        loadChildren: () =>
          import('./not-verified/not-verified.module').then(
            m => m.NotVerifiedPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class AuthModule {}
