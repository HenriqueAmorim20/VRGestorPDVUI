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
import { Rede } from '../interfaces/rede.interface';
import { RedeService } from '../rede.service';
import { FormConfig } from '../../../../shared/interfaces/form-config.interface';

@Component({
  selector: 'vr-new-rede',
  imports: [
    TranslatePipe,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    RouterModule,
    PageHeaderComponent,
    FormFieldsListComponent,
  ],
  templateUrl: './new-or-edit-rede.component.html',
  styleUrls: ['./new-or-edit-rede.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrEditRedeComponent extends BaseNewOrEditComponent<Rede> {
  service = inject(RedeService);
  basePath = '/rede';
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
      formName: 'descricao',
      type: 'text',
      label: 'common.description',
      placeholder: 'common.description',
      required: true,
      class: 'flex-basis-30',
    },
  ];
  title = 'rede.create';
  formConfig: FormConfig = {
    id: [{ value: '', disabled: true }],
    descricao: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  };
}
