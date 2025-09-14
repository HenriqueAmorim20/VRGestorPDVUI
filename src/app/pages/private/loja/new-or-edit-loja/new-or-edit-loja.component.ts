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
import { Loja } from '../interfaces/loja.interface';
import { LojaService } from '../loja.service';

@Component({
  selector: 'vr-new-loja',
  imports: [
    TranslatePipe,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    RouterModule,
    PageHeaderComponent,
    FormFieldsListComponent,
  ],
  templateUrl: './new-or-edit-loja.component.html',
  styleUrls: ['./new-or-edit-loja.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrEditLojaComponent extends BaseNewOrEditComponent<Loja> {
  service = inject(LojaService);
  basePath = '/loja';
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
    {
      formFieldType: FormFieldType.SELECT,
      formName: 'idRede',
      label: 'network.title',
      class: 'flex-basis-25',
      enableServerSearch: true,
      serverResourcePath: '/rede',
    },
  ];
  title = 'store.create';
  formConfig: FormConfig = {
    id: [{ value: '', disabled: true }],
    descricao: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    idRede: ['', [Validators.required]],
  };
}
