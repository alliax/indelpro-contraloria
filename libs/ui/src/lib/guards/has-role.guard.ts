import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthQuery } from '@alliax/feathers-client';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(private authQuery: AuthQuery, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.authQuery.selectUser$
      .pipe(
        filter((value) => !!value),
        take(1)
      )
      .toPromise();
    if (user.role.includes('formas-admin')) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }
}
