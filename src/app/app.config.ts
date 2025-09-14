import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { pt_BR, provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './shared/interceptors/request-interceptor.interceptor';
import { NzModalModule } from 'ng-zorro-antd/modal';

registerLocaleData(pt);
registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(pt_BR),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    importProvidersFrom(NzModalModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([requestInterceptor])),
  ],
};
