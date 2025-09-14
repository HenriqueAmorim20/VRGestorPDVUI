import { Component, effect, input, model } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AllTableSettings, TableData } from './interfaces/table.interface';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslatePipe } from '../../pipes/translate/translate.pipe';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DispatcherPipeModule } from '../../pipes/dispatcher/dispatcher.pipe.module';

type AnyTableData = unknown & TableData;

@Component({
  selector: 'vr-table',
  imports: [
    NzTableModule,
    NzCheckboxModule,
    NzPaginationModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    TranslatePipe,
    DispatcherPipeModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  data = input.required<AnyTableData[]>();
  selectedData = model<AnyTableData[]>([]);
  settings = input.required<AllTableSettings>();
  allChecked = false;
  indeterminate = false;
  expandSet = new Set<AnyTableData>();

  constructor() {
    effect(() => this.refreshStatus());
  }

  refreshStatus(): void {
    this.handleCheckedData();
    // TODO: analisar caso muito específico quanto tiver itens desabilitados selecionados
    const validData = this.data().filter((value) => !value.disabled);
    const allChecked = validData.length > 0 && validData.every((value) => value.checked);
    const allUnChecked = validData.every((value) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  handleCheckedData(): void {
    this.data().forEach((data) => {
      const isSelected = this.selectedData().some((item) => item['id'] === data['id']);
      data.checked = isSelected;
    });
  }

  checkAll(value: boolean): void {
    this.data().forEach((data) => {
      if (!data.disabled) {
        this.onCheckedChange(data, value);
      }
    });
  }

  getActionsWidth(): string {
    const actionsLength = this.settings().actions?.length ?? 0;
    return (Math.max(actionsLength, 2) * 40).toString() + 'px';
  }

  getActionsGridTemplateColumns(): string {
    const actionsLength = this.settings().actions?.length ?? 0;
    return 'repeat(' + actionsLength + ', 1fr)';
  }

  onExpandChange(data: AnyTableData, checked: boolean): void {
    if (checked) {
      this.expandSet.add(data);
    } else {
      this.expandSet.delete(data);
    }
  }

  onCheckedChange(data: AnyTableData, checked: boolean): void {
    if (checked) {
      this.selectedData.update((prev) => [...prev, data]);
    } else {
      this.selectedData.update((prev) => prev.filter((item) => item['id'] !== data['id']));
    }

    this.refreshStatus();
  }
}
