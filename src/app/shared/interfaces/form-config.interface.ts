import { ValidatorFn } from '@angular/forms';

type FormControlConfig<T = unknown> =
  | T
  | { value: T; disabled?: boolean }
  | [T, (ValidatorFn | ValidatorFn[])?]
  | [{ value: T; disabled?: boolean }, (ValidatorFn | ValidatorFn[])?];

export interface FormConfig {
  [key: string]: FormControlConfig;
}
