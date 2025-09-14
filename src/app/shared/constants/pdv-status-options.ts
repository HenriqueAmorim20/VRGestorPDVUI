import { PDVStatus } from '../enums/pdv-status.enum';
import { LabelValue } from '../interfaces/label-value.interface';

export const PDV_STATUS_OPTIONS: LabelValue<PDVStatus>[] = [
  { label: 'common.all', value: PDVStatus.ALL },
  { label: 'enums.pdv_status.linked', value: PDVStatus.LINKED },
  { label: 'enums.pdv_status.unlinked', value: PDVStatus.UNLINKED },
];
