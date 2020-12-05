import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { QUERY_PARAMS } from 'src/app/constants/query-params';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    const redirectTo = state.url;
    console.log(redirectTo);
    this.router.navigate([APP_ROUTES.LOGIN], {
      queryParams: {
        [QUERY_PARAMS.redirect]: redirectTo
      },
      queryParamsHandling: 'merge'
    });
    return false;
  }
}
