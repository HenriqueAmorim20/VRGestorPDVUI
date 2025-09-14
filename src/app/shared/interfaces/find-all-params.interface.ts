import { SortTable } from '../components/table/interfaces/table.interface';

export interface FindAllParams<T = Record<string, unknown>> {
  filter: T;
  sort: SortTable;
  pageSize: number;
  pageIndex: number;
}
