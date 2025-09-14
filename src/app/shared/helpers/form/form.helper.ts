import { FormGroup } from '@angular/forms';

export function checkInvalidFields(form: FormGroup): void {
  Object.values(form.controls).forEach((control) => {
    if ((control as FormGroup).controls) {
      checkInvalidFields(control as FormGroup);
    } else if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
}
