import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
  CanActivateChild
} from "@angular/router";

import { LoginSessionService } from "../login.sessionService";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _sessionService: LoginSessionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLoggedIn(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLoggedIn(state.url);
  }
  checkLoggedIn(url: string): boolean {
    if (this._sessionService.isAuthenticated()) {
      return true;
    }

    // Retain the attempted URL for redirection
    this._sessionService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
