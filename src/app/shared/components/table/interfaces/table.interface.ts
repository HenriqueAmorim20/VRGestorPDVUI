import { NzTablePaginationPosition, NzTableQueryParams, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzTablePaginationType } from 'ng-zorro-antd/table';
import { NzTableSize } from 'ng-zorro-antd/table';
import { NzTableLayout } from 'ng-zorro-antd/table';
import { DispatcherConfig } from '../../../pipes/dispatcher/dispatcher.pipe';

export interface TableData {
  [key: string]: unknown;
  checked: boolean;
  disabled: boolean;
  expandContent: string;
}

export interface TableColumn {
  label: string;
  key: string;
  width?: string;
  sort?: boolean;
  fixed?: 'left' | 'right' | null;
  dataTransform?: (data: any) => any;
  pipeConfig?: DispatcherConfig;
}

export interface TableAction {
  label: string;
  icon: string;
  onClick: (item: any) => void;
  width?: string;
}

export interface TableSettings {
  columns: TableColumn[];
  actions: TableAction[];
  onQueryParamsChange: (params: NzTableQueryParams) => void;

  loading?: boolean;
  total?: number;
  pageSize?: number;
  pageIndex?: number;
  frontPagination?: boolean;
  showPagination?: boolean;
  sizeChanger?: boolean;
  title?: string;
  //! mostrar ou não o cabeçalho com as colunas
  header?: boolean;
  footer?: string;
  expandable?: boolean;
  checkbox?: boolean;
  ellipsis?: boolean;
  simple?: boolean;
  //? Analisar comportamento, principalmente para manter um tamanho mínimo das colunas
  scrollX?: string;
  //! Em px
  scrollY?: string;
  size?: NzTableSize;
  //? Não sei o que faz
  tableLayout?: NzTableLayout;
  position?: NzTablePaginationPosition;
  paginationType?: NzTablePaginationType;
}

export interface AllTableSettings {
  loading: boolean;
  frontPagination: boolean;
  showPagination: boolean;
  sizeChanger: boolean;
  title: string | null;
  header: boolean;
  footer: string | null;
  expandable: boolean;
  checkbox: boolean;
  ellipsis: boolean;
  simple: boolean;
  total: number;
  pageSize: number;
  pageIndex: number;
  scrollX: string | null;
  scrollY: string | null;
  size: NzTableSize;
  tableLayout: NzTableLayout;
  position: NzTablePaginationPosition;
  paginationType: NzTablePaginationType;
  columns: TableColumn[];
  actions: TableAction[];
  onQueryParamsChange: (params: NzTableQueryParams) => void;
}

export interface SortTable {
  key: string;
  value: NzTableSortOrder;
}
