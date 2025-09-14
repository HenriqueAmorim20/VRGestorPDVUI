import { Active } from '../enums/active.enum';
import { LabelValue } from '../interfaces/label-value.interface';

export const ACTIVE_OPTIONS: LabelValue<Active>[] = [
  { label: 'common.all', value: Active.ALL },
  { label: 'common.active', value: Active.ACTIVE },
  { label: 'common.inactive', value: Active.INACTIVE },
];
