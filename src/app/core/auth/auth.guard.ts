import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  #authService = inject(AuthService);
  #router = inject(Router);

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.#authService.user$.pipe(
      map((user) => {
        if (!user) {
          this.#router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }

        return true;
      })
    );
  }
}
