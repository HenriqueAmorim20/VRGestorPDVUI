import { TableData } from '../../../../shared/components/table/interfaces/table.interface';
import { AtualizacaoStatus } from '../../../../shared/enums/atualizacao-status.enum';

export interface Atualizacao extends TableData {
  id: string;
  idsPdvs: string[];
  descricaoPdvs: string;
  status: AtualizacaoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AtualizacaoFilters extends Record<string, unknown> {
  id?: string;
  idsPdvs?: number[] | null;
}
