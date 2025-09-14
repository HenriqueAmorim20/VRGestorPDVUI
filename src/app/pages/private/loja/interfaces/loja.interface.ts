import { TableData } from '../../../../shared/components/table/interfaces/table.interface';

export interface Loja extends TableData {
  id: string;
  descricao: string;
  idRede: number;
  descricaoRede: string;
  createdAt: string;
  updatedAt: string;
}

export interface LojaFilters extends Record<string, unknown> {
  id?: string;
  descricao?: string;
  idRede?: number | null;
}
