import { TableData } from '../../../../shared/components/table/interfaces/table.interface';

export interface Rede extends TableData {
  id: string;
  descricao: string;
  createdAt: string;
  updatedAt: string;
}

export interface RedeFilters extends Record<string, unknown> {
  id?: string;
  descricao?: string;
}
