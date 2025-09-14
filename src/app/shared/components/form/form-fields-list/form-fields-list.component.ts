import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TranslatePipe } from '../../../pipes/translate/translate.pipe';
import { FormFieldOptions } from '../form-field/interfaces/form-field.interface';

@Component({
  selector: 'vr-form-fields-list',
  imports: [TranslatePipe, ReactiveFormsModule, FormFieldComponent, NzFormModule],
  templateUrl: './form-fields-list.component.html',
  styleUrl: './form-fields-list.component.scss',
})
export class FormFieldsListComponent {
  form = input.required<FormGroup>();
  fields = input.required<FormFieldOptions[]>();
}
