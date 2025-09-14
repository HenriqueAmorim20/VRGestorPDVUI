import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { BaseNewOrEditComponent } from '../../../../shared/classes/base-new-or-edit.class';
import { Atualizacao } from '../interfaces/atualizacao.interface';
import { AtualizacaoService } from '../atualizacao.service';
import { FormFieldOptions } from '../../../../shared/components/form/form-field/interfaces/form-field.interface';
import { Validators } from '@angular/forms';
import { FormFieldType } from '../../../../shared/enums/form-field-type.enum';
import { FormConfig } from '../../../../shared/interfaces/form-config.interface';
import { FormFieldsListComponent } from '../../../../shared/components/form/form-fields-list/form-fields-list.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { NotificationService } from '../../../../shared/services/notification/notification.service';

@Component({
  selector: 'vr-new-atualizacao',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    RouterModule,
    PageHeaderComponent,
    NzUploadModule,
    FormFieldsListComponent,
    TranslatePipe,
  ],
  templateUrl: './new-atualizacao.component.html',
  styleUrls: ['./new-atualizacao.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAtualizacaoComponent extends BaseNewOrEditComponent<Atualizacao> {
  #notification = inject(NotificationService);
  service = inject(AtualizacaoService);
  basePath = '/pdv';
  fields: FormFieldOptions[] = [
    {
      formFieldType: FormFieldType.SELECT,
      formName: 'idsPdvs',
      label: 'common.pdvs',
      class: 'flex-basis-25',
      enableServerSearch: true,
      serverResourcePath: '/pdv',
    },
  ];
  title = 'update.create';
  formConfig: FormConfig = {
    idsPdvs: ['', [Validators.required]],
  };
  file?: NzUploadFile;
  fileList: NzUploadFile[] = [];

  handleChange({ file }: NzUploadChangeParam): void {
    const status = file.status;
    this.file = undefined;
    this.fileList = [];

    if (status === 'done') {
      this.#notification.success('messages.frontend.file_uploaded');
      this.file = file;
      this.fileList = [file];
    } else if (status === 'error') {
      this.#notification.warning('messages.frontend.file_upload_error');
    }
  }
}
