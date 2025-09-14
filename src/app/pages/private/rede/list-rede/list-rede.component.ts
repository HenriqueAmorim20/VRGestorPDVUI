import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BaseListComponent } from '../../../../shared/classes/base-list.class';
import { FormFieldOptions } from '../../../../shared/components/form/form-field/interfaces/form-field.interface';
import { FormFieldsListComponent } from '../../../../shared/components/form/form-fields-list/form-fields-list.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TableSettings } from '../../../../shared/components/table/interfaces/table.interface';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { FormFieldType } from '../../../../shared/enums/form-field-type.enum';
import { DispatcherPipeModule } from '../../../../shared/pipes/dispatcher/dispatcher.pipe.module';
import { FormatIdPipe } from '../../../../shared/pipes/format-id/format-id.pipe';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { Rede, RedeFilters } from '../interfaces/rede.interface';
import { RedeService } from '../rede.service';

@Component({
  selector: 'vr-list-rede',
  imports: [
    TableComponent,
    TranslatePipe,
    NzButtonModule,
    NzIconModule,
    DispatcherPipeModule,
    PageHeaderComponent,
    FormFieldsListComponent,
    RouterModule,
  ],
  templateUrl: './list-rede.component.html',
  styleUrls: ['./list-rede.component.scss'],
})
export class ListRedeComponent extends BaseListComponent<Rede, RedeFilters> implements OnInit, OnDestroy {
  FormFieldType = FormFieldType;
  service = inject(RedeService);
  filterFields: FormFieldOptions[] = [
    {
      formFieldType: FormFieldType.INPUT,
      formName: 'id',
      label: 'common.id',
      type: 'number',
      placeholder: 'Ex.: 142',
      class: 'flex-basis-15',
    },
    {
      formFieldType: FormFieldType.INPUT,
      formName: 'descricao',
      label: 'common.description',
      placeholder: 'Ex.: Descrição',
      class: 'flex-basis-30',
    },
  ];
  createButtonLabel = 'network.create';
  title = 'network.title';
  filters: RedeFilters = {
    id: '',
    descricao: '',
  };
  tableSettings: TableSettings = {
    checkbox: false,
    columns: [
      {
        label: 'common.id',
        key: 'id',
        width: '70px',
        fixed: 'left',
        pipeConfig: { pipe: FormatIdPipe },
      },
      {
        label: 'common.description',
        key: 'descricao',
      },
    ],
    actions: [
      {
        label: 'common.edit',
        icon: 'edit',
        onClick: this.onEdit.bind(this),
      },
    ],
    onQueryParamsChange: this.onQueryParamsChange.bind(this),
  };
}
