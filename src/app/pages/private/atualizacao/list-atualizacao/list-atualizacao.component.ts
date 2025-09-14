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
import { EnumLabelPipe } from '../../../../shared/pipes/enum-label/enum-label.pipe';
import { AtualizacaoStatus } from '../../../../shared/enums/atualizacao-status.enum';
import { AtualizacaoService } from '../atualizacao.service';
import { ATUALIZACAO_STATUS_OPTIONS } from '../../../../shared/constants/atualizacao-status-options';
import { Atualizacao, AtualizacaoFilters } from '../interfaces/atualizacao.interface';

@Component({
  selector: 'vr-list-atualizacao',
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
  templateUrl: './list-atualizacao.component.html',
  styleUrls: ['./list-atualizacao.component.scss'],
})
export class ListAtualizacaoComponent
  extends BaseListComponent<Atualizacao, AtualizacaoFilters>
  implements OnInit, OnDestroy
{
  FormFieldType = FormFieldType;
  service = inject(AtualizacaoService);
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
      formFieldType: FormFieldType.SELECT,
      formName: 'idsLoja',
      label: 'common.stores',
      class: 'flex-basis-25',
      enableServerSearch: true,
      serverResourcePath: '/loja',
      allowClear: true,
      selectMode: 'multiple',
    },
    {
      formFieldType: FormFieldType.SELECT,
      formName: 'status',
      label: 'common.status',
      class: 'flex-basis-20',
      data: ATUALIZACAO_STATUS_OPTIONS,
    },
  ];
  createButtonLabel = 'pdv.create';
  title = 'pdv.title';
  filters: AtualizacaoFilters = {
    id: '',
    idsLojas: null,
    status: AtualizacaoStatus.ALL,
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
        label: 'pdv.title',
        key: 'descricaoPdvs',
      },
      {
        label: 'common.status',
        key: 'status',
        pipeConfig: { pipe: EnumLabelPipe, pipeArgs: [ATUALIZACAO_STATUS_OPTIONS] },
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
