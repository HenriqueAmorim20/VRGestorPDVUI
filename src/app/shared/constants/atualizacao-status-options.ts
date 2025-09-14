import { AtualizacaoStatus } from '../enums/atualizacao-status.enum';
import { LabelValue } from '../interfaces/label-value.interface';

export const ATUALIZACAO_STATUS_OPTIONS: LabelValue<AtualizacaoStatus>[] = [
  { label: 'common.all', value: AtualizacaoStatus.ALL },
  { label: 'enums.atualizacao_status.sent', value: AtualizacaoStatus.SENT },
  { label: 'enums.atualizacao_status.executed', value: AtualizacaoStatus.EXECUTED },
  { label: 'enums.atualizacao_status.error', value: AtualizacaoStatus.ERROR },
];
