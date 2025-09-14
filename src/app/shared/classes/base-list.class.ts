import { OnInit, OnDestroy, inject, Component } from '@angular/core';
import { NonNullableFormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { FormFieldOptions } from '../components/form/form-field/interfaces/form-field.interface';
import { UserJwt } from '../interfaces/user.interface';
import { DynamicResourceService } from '../services/dynamic-resource/dynamic-resource.service';
import { AllTableSettings, SortTable, TableData, TableSettings } from '../components/table/interfaces/table.interface';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { buildTableSettings, extractSort, buildTableData } from '../components/table/helpers/table.helper';
import { removeEmptyValues } from '../helpers/remove-empty-values/remove-empy-values.helper';

@Component({ template: '' })
export abstract class BaseListComponent<T extends TableData, F extends Record<string, unknown>>
  implements OnInit, OnDestroy
{
  #router = inject(Router);
  #fb = inject(NonNullableFormBuilder);
  #authService = inject(AuthService);

  abstract service: DynamicResourceService<T>;
  abstract tableSettings: TableSettings;
  abstract filters: F;
  abstract filterFields: FormFieldOptions[];
  abstract createButtonLabel: string;
  abstract title: string;

  builtTableSettings!: AllTableSettings;
  filtersForm!: FormGroup;
  unsubscribe$ = new Subject<void>();
  loadDataDebounce = new Subject<void>();
  sort: SortTable = { key: 'id', value: 'ascend' };
  data: T[] = [];
  user!: UserJwt | null;

  ngOnInit(): void {
    this.buildForm();
    this.buildTableSettings();
    this.loadUser();
  }

  loadUser(): void {
    this.#authService.user$.subscribe((user) => {
      this.user = user;
      this.delayLoadData();
    });
  }

  buildForm(): void {
    this.filtersForm = this.#fb.group<F>({ ...this.filters });
  }

  buildTableSettings(): void {
    this.builtTableSettings = buildTableSettings(this.tableSettings);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.builtTableSettings.pageIndex = params.pageIndex;
    this.builtTableSettings.pageSize = params.pageSize;
    this.sort = extractSort(params.sort);

    this.loadDataDebounce.next();
  }

  delayLoadData(): void {
    this.loadDataDebounce
      .pipe(
        tap(() => (this.builtTableSettings.loading = true)),
        debounceTime(500),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.loadData());
  }

  loadData(): void {
    this.builtTableSettings.loading = true;
    this.buildFilters();

    this.service
      .get<F>({
        filter: this.filters,
        sort: this.sort,
        pageSize: this.builtTableSettings.pageSize,
        pageIndex: this.builtTableSettings.pageIndex,
      })
      .subscribe({
        next: (response) => {
          const data: T[] = response.data;
          //! É possível deixar uma linha inicialmente já marcada ou desabilitada
          const tableData = buildTableData(data);

          this.data = tableData;
          this.builtTableSettings.total = response.count ?? 0;
          this.builtTableSettings.loading = false;

          this.checkPageIndex();
        },
        complete: () => (this.builtTableSettings.loading = false),
      });
  }

  buildFilters(): void {
    this.filters = removeEmptyValues(this.filtersForm.getRawValue());
  }

  private checkPageIndex(): void {
    if (this.data.length === 0 && this.builtTableSettings.pageIndex > 1) {
      this.builtTableSettings.pageIndex = this.builtTableSettings.pageIndex - 1;
      this.loadData();
    }
  }

  onEdit(item: T & { id: number }): void {
    if (item.id) {
      this.#router.navigateByUrl(`${this.#router.url}/edit/${item.id}`);
    }
  }

  search(): void {
    this.builtTableSettings.pageIndex = 1;
    this.builtTableSettings.pageSize = 10;
    this.loadDataDebounce.next();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
