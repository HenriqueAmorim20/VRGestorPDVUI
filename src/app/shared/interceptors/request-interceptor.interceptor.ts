import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '../services/translate/translate.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const translateService = inject(TranslateService);
  const notificationService = inject(NzNotificationService);
  const router = inject(Router);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const body = event.body as { message: string | null };

        if (body?.message) {
          const title = translateService.getTranslation('messages.success');
          const message = translateService.getTranslation(body.message);
          notificationService.success(title, message, { nzPlacement: 'bottomRight' });
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const body = error.error as { message: string | null; statusCode: number };

      if (body?.message) {
        const title = translateService.getTranslation('messages.error');
        const message = translateService.getTranslation(body.message);
        notificationService.error(title, message, { nzPlacement: 'bottomRight' });
      }

      if (body?.statusCode === 401) {
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
