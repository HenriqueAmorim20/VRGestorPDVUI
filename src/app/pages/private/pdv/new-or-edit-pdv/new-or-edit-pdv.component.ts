import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BaseNewOrEditComponent } from '../../../../shared/classes/base-new-or-edit.class';
import { FormFieldOptions } from '../../../../shared/components/form/form-field/interfaces/form-field.interface';
import { FormFieldsListComponent } from '../../../../shared/components/form/form-fields-list/form-fields-list.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { FormFieldType } from '../../../../shared/enums/form-field-type.enum';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { FormConfig } from '../../../../shared/interfaces/form-config.interface';
import { PDVService } from '../pdv.service';
import { PDV } from '../interfaces/pdv.interface';

@Component({
  selector: 'vr-new-pdv',
  imports: [
    TranslatePipe,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    RouterModule,
    PageHeaderComponent,
    FormFieldsListComponent,
  ],
  templateUrl: './new-or-edit-pdv.component.html',
  styleUrls: ['./new-or-edit-pdv.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrEditPDVComponent extends BaseNewOrEditComponent<PDV> {
  service = inject(PDVService);
  basePath = '/pdv';
  fields: FormFieldOptions[] = [
    {
      formFieldType: FormFieldType.INPUT,
      formName: 'id',
      type: 'number',
      label: 'common.id',
      placeholder: 'common.id',
      disabled: true,
      class: 'flex-basis-10',
    },
    {
      formFieldType: FormFieldType.INPUT,
      formName: 'uuid',
      type: 'text',
      label: 'common.uuid',
      placeholder: 'common.uuid',
      disabled: true,
      class: 'flex-basis-20',
    },
    {
      formFieldType: FormFieldType.SELECT,
      formName: 'idLoja',
      label: 'store.title',
      class: 'flex-basis-25',
      enableServerSearch: true,
      serverResourcePath: '/loja',
    },
  ];
  title = 'store.create';
  formConfig: FormConfig = {
    id: [{ value: '', disabled: true }],
    uuid: [{ value: '', disabled: true }],
    idLoja: ['', [Validators.required]],
  };
}
