import { AllTableSettings, SortTable, TableColumn, TableData, TableSettings } from '../interfaces/table.interface';

export function buildTableData<T extends TableData>(data: T[]): T[] {
  return data.map((item) => ({
    ...item,
    checked: item.checked ?? false,
    disabled: item.disabled ?? false,
    expandContent: item.expandContent ?? ' - ',
  }));
}

export function buildTableSettings(payload: TableSettings): AllTableSettings {
  return {
    loading: payload.loading ?? false,
    total: payload.total ?? 0,
    pageSize: payload.pageSize ?? 10,
    pageIndex: payload.pageIndex ?? 1,
    onQueryParamsChange: payload.onQueryParamsChange,
    frontPagination: payload.frontPagination ?? false,
    showPagination: payload.showPagination ?? true,
    sizeChanger: payload.sizeChanger ?? true,
    title: payload.title ?? null,
    header: payload.header ?? true,
    footer: payload.footer ?? null,
    expandable: payload.expandable ?? false,
    checkbox: payload.checkbox ?? true,
    ellipsis: payload.ellipsis ?? true,
    simple: payload.simple ?? false,
    scrollX: payload.scrollX ?? '100%',
    scrollY: payload.scrollY ?? null,
    size: payload.size ?? 'default',
    tableLayout: payload.tableLayout ?? 'auto',
    position: payload.position ?? 'bottom',
    paginationType: payload.paginationType ?? 'default',
    columns: mapColumns(payload.columns),
    actions: payload.actions,
  };
}

function mapColumns(columns: TableColumn[]): TableColumn[] {
  return columns.map((column) => ({
    ...column,
    sort: column.sort ?? true,
  }));
}

export function extractSort(sortOptions: SortTable[]): SortTable {
  return sortOptions.find((option) => option.value) ?? { key: 'id', value: 'ascend' };
}
