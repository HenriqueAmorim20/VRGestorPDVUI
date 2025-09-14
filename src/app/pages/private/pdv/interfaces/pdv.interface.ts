import { TableData } from '../../../../shared/components/table/interfaces/table.interface';

export interface PDV extends TableData {
  id: string;
  uuid: string;
  idLoja: number;
  descricaoLoja: string;
  createdAt: string;
  updatedAt: string;
}

export interface PDVFilters extends Record<string, unknown> {
  id?: string;
  idsLojas?: number[] | null;
}
