import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '../../shared/services/translate/translate.service';

export interface CanComponentDeactivate {
  hasUnsavedChanges: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PendingChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  #modal = inject(NzModalService);
  #translate = inject(TranslateService);
  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    if (!component.hasUnsavedChanges) {
      return true;
    }

    const responseSubject = new Subject<boolean>();

    if (component.hasUnsavedChanges()) {
      this.#modal.confirm({
        nzTitle: this.#translate.getTranslation('modal.confirm_exit'),
        nzContent: this.#translate.getTranslation('modal.confirm_exit_description'),
        nzOkText: this.#translate.getTranslation('common.yes'),
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => responseSubject.next(true),
        nzCancelText: this.#translate.getTranslation('common.no'),
        nzOnCancel: () => responseSubject.next(false),
      });

      return responseSubject.asObservable();
    } else {
      return true;
    }
  }
}
