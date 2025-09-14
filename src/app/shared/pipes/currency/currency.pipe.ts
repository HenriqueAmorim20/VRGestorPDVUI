import { inject, Pipe, PipeTransform } from '@angular/core';
import { LANGUAGE_TO_CURRENCY } from '../../constants/language-to-currency';
import { TranslateService } from '../../services/translate/translate.service';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  #translateService = inject(TranslateService);

  transform(value: number) {
    if (!value) return value;

    try {
      const locale = this.#translateService.getSelectedLanguage();
      const currency = LANGUAGE_TO_CURRENCY[locale];
      return Number(value).toLocaleString(locale, { style: 'currency', currency });
    } catch {
      return value;
    }
  }
}
