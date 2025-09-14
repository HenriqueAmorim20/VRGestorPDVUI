import { Component, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslatePipe } from '../../../pipes/translate/translate.pipe';

interface ErrorEquivalent {
  label: string;
  valuesToReplace: { key: string; value: string }[];
}

@Component({
  selector: 'vr-form-field-error',
  imports: [TranslatePipe],
  templateUrl: './form-field-error.component.html',
  styleUrl: './form-field-error.component.scss',
})
export class FormFieldErrorComponent {
  control = input<AbstractControl>();

  get errorEquivalent(): ErrorEquivalent | null {
    const errors: ValidationErrors = this.control()?.errors ?? {};
    const error = Object.keys(errors)[0];
    const errorValue = errors[error];

    if (!error) return null;

    const errorEquivalent: { [key: string]: ErrorEquivalent } = {
      default: { label: 'errors.invalid-field', valuesToReplace: [] },
      required: { label: 'errors.required', valuesToReplace: [] },
      email: { label: 'errors.email', valuesToReplace: [] },
      endNotAfterStart: {
        label: 'errors.end_not_after_start',
        valuesToReplace: [{ key: 'value', value: errorValue }],
      },
      // minlength: {
      //   label: 'errors.minlength',
      //   valuesToReplace: [{ key: 'value', value: error?.['minlength'].requiredLength }],
      // },
      // maxlength: {
      //   label: 'errors.maxlength',
      //   valuesToReplace: [{ key: 'value', value: error?.['maxlength'].requiredLength }],
      // },
      // min: { label: 'errors.min', valuesToReplace: [{ key: 'value', value: error?.['min'].min }] },
      // max: { label: 'errors.max', valuesToReplace: [{ key: 'value', value: error?.['max'].max }] },
    };

    return errorEquivalent[error] ?? errorEquivalent['default'];
  }
}
