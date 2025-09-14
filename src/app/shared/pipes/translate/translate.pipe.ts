import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services/translate/translate.service';
import { ValueToReplace } from './interfaces/value-to-replace.interface';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  #translateService = inject(TranslateService);

  transform(value: string, valuesToReplace: ValueToReplace[] = []): string {
    return this.#translateService.getTranslation(value, valuesToReplace);
  }
}
