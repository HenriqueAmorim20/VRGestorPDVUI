import { LabelValue } from './../../../../interfaces/label-value.interface';
import { FormFieldType } from '../../../../enums/form-field-type.enum';
import { NzSelectModeType } from 'ng-zorro-antd/select';

export interface FormFieldOptions {
  formFieldType: FormFieldType;
  formName: string;
  type?: string;
  suffixIcon?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  data?: LabelValue[];
  required?: boolean;
  hasFeedback?: boolean;
  class?: string;
  enableServerSearch?: boolean;
  serverResourcePath?: string;
  allowClear?: boolean;
  selectMode?: NzSelectModeType;
  maxTagCount?: number;
  format?: string;
}
