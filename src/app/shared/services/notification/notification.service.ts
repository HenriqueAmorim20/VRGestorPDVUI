import { Injectable, inject } from '@angular/core';
import { TranslateService } from '../translate/translate.service';
import { NzNotificationService, NzNotificationPlacement } from 'ng-zorro-antd/notification';

const DEFAULT_DURATION = 5000;
const DEFAULT_PLACEMENT = 'bottomRight';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  #translate = inject(TranslateService);
  #notification = inject(NzNotificationService);

  success(
    message: string,
    title: string = 'messages.success',
    nzDuration: number = DEFAULT_DURATION,
    nzPlacement: NzNotificationPlacement = DEFAULT_PLACEMENT
  ): void {
    title = this.#translate.getTranslation(title);
    message = this.#translate.getTranslation(message);
    this.#notification.success(title, message, {
      nzDuration,
      nzPlacement,
    });
  }

  error(
    message: string,
    title = 'messages.error',
    nzDuration: number = DEFAULT_DURATION,
    nzPlacement: NzNotificationPlacement = DEFAULT_PLACEMENT
  ): void {
    title = this.#translate.getTranslation(title);
    message = this.#translate.getTranslation(message);
    this.#notification.error(title, message, {
      nzDuration,
      nzPlacement,
    });
  }

  warning(
    message: string,
    title = 'messages.warning',
    nzDuration: number = DEFAULT_DURATION,
    nzPlacement: NzNotificationPlacement = DEFAULT_PLACEMENT
  ): void {
    title = this.#translate.getTranslation(title);
    message = this.#translate.getTranslation(message);
    this.#notification.warning(title, message, {
      nzDuration,
      nzPlacement,
    });
  }

  info(
    message: string,
    title = 'messages.info',
    nzDuration: number = DEFAULT_DURATION,
    nzPlacement: NzNotificationPlacement = DEFAULT_PLACEMENT
  ): void {
    title = this.#translate.getTranslation(title);
    message = this.#translate.getTranslation(message);
    this.#notification.info(title, message, {
      nzDuration,
      nzPlacement,
    });
  }
}
