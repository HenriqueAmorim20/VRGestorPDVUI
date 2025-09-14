import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services/translate/translate.service';

@Pipe({
  name: 'boolean',
})
export class BooleanPipe implements PipeTransform {
  #translateService = inject(TranslateService);

  transform(value: boolean): string {
    return this.#translateService.getTranslation(value ? 'common.yes' : 'common.no');
  }
}
