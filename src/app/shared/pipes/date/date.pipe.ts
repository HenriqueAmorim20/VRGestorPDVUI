import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services/translate/translate.service';

@Pipe({
  name: 'date',
  pure: false,
})
export class DatePipe implements PipeTransform {
  #translateService = inject(TranslateService);

  transform(value?: string | null, options?: Intl.DateTimeFormatOptions): string {
    if (!value) return ' - ';

    try {
      const locale = this.#translateService.getSelectedLanguage();
      return new Date(value).toLocaleDateString(
        locale,
        options ?? {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }
      );
    } catch {
      return value;
    }
  }
}
