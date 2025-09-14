import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services/translate/translate.service';
import { LabelValue } from '../../interfaces/label-value.interface';

@Pipe({
  name: 'enumLabel',
  pure: false,
})
export class EnumLabelPipe implements PipeTransform {
  #translateService = inject(TranslateService);

  transform(value: unknown, options: LabelValue[]): string {
    return this.#translateService.getTranslation(
      options.find((option: LabelValue) => option.value === value)?.label ?? ''
    );
  }
}
