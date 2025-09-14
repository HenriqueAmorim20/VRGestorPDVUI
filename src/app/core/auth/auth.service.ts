import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, take, ReplaySubject, of } from 'rxjs';
import { DynamicResourceService } from '../../shared/services/dynamic-resource/dynamic-resource.service';
import { STORAGE_KEYS } from '../../shared/constants/storage-keys';
// import { ResponseMessage } from '../../shared/interfaces/response-message.interface';
import { UserJwt } from '../../shared/interfaces/user.interface';

interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DynamicResourceService {
  #router = inject(Router);
  #http = inject(HttpClient);
  #userSubject = new ReplaySubject<UserJwt | null>(1);
  user$ = this.#userSubject.asObservable();

  constructor() {
    super();
    this.initUrl('auth');
    this.initAuth();
  }

  private initAuth(): void {
    this.#userSubject.next({ name: 'Henrique', email: 'hacmelo@gmail.com', sub: 1 });

    // this.#http
    //   .get<ResponseMessage<UserJwt>>(this.url + 'check-login', { withCredentials: true })
    //   .pipe(
    //     take(1),
    //     tap({
    //       next: (response) => {
    //         this.#userSubject.next(response.data);
    //       },
    //       error: () => {
    //         this.#userSubject.next(null);
    //       },
    //     })
    //   )
    //   .subscribe();
  }

  login(payload: LoginPayload, redirectUrl?: string | null): Observable<unknown> {
    this.#userSubject.next({ name: 'Henrique', email: 'hacmelo@gmail.com', sub: 1 });
    if (redirectUrl) {
      this.#router.navigate([redirectUrl]);
    } else {
      this.#router.navigate(['/dashboard']);
    }
    this.setRememberMe(payload.remember, payload.email);
    return of();

    // return this.#http.post<ResponseMessage<UserJwt>>(this.url + 'login', payload, { withCredentials: true }).pipe(
    //   take(1),
    //   tap((response) => {
    //     this.#userSubject.next(response.data);
    //     this.setRememberMe(payload.remember, payload.email);

    //     if (redirectUrl) {
    //       this.#router.navigate([redirectUrl]);
    //     } else {
    //       this.#router.navigate(['/dashboard']);
    //     }
    //   })
    // );
  }

  private setRememberMe(remember: boolean, email: string): void {
    if (remember) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERME, email);
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBERME);
    }
  }

  logout(): Observable<unknown> {
    return this.#http.post(this.url + 'logout', {}, { withCredentials: true }).pipe(
      take(1),
      tap(() => {
        this.#userSubject.next(null);
        this.#router.navigateByUrl('/login', { replaceUrl: true });
      })
    );
  }
}
