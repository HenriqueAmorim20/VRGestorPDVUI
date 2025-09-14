import { Component, input, OnInit, OnDestroy, inject, model } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TranslatePipe } from '../../../pipes/translate/translate.pipe';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { FormFieldType } from '../../../enums/form-field-type.enum';
import { LabelValue } from '../../../interfaces/label-value.interface';
import { NzSelectModeType, NzSelectModule } from 'ng-zorro-antd/select';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DynamicResourceService } from '../../../services/dynamic-resource/dynamic-resource.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'vr-form-field',
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzFormModule,
    NzCheckboxModule,
    TranslatePipe,
    FormFieldErrorComponent,
    CommonModule,
    NzSpinModule,
    NzDatePickerModule,
    NzTimePickerModule,
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent implements OnInit, OnDestroy {
  #service = inject(DynamicResourceService);
  FormFieldType = FormFieldType;
  loadingData = false;
  passwordVisible = false;
  debounceSearch$ = new BehaviorSubject<string>('');
  unsubscribe$ = new Subject<void>();

  formFieldType = input.required<FormFieldType>();
  formName = input.required<string>();
  form = input.required<FormGroup>();
  type = input<string>('text');
  suffixIcon = input<string>();
  disabled = input<boolean>();
  placeholder = input<string>();
  label = input<string>();
  data = model<LabelValue[]>();
  required = input<boolean>();
  hasFeedback = input<boolean>();
  enableServerSearch = input<boolean>();
  serverResourcePath = input<string>();
  allowClear = input<boolean>();
  selectMode = input<NzSelectModeType>('default');
  maxTagCount = input<number>(1);
  format = input<string>('dd/MM/yyyy');

  get isPassword() {
    return this.type() === 'password';
  }

  get isCheckbox() {
    return this.formFieldType() === FormFieldType.CHECKBOX;
  }

  ngOnInit(): void {
    this.validateServerSearch();
  }

  validateServerSearch() {
    if (this.enableServerSearch()) {
      if (!this.serverResourcePath()) {
        throw new Error('serverResourcePath is required');
      }

      this.startDebounceSearch();
    }
  }

  startDebounceSearch() {
    this.debounceSearch$
      .pipe(
        filter(() => !!this.enableServerSearch()),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$),
        tap((filter) => this.loadData(filter))
      )
      .subscribe();
  }

  loadData(filter: string) {
    this.loadingData = true;
    this.#service.initUrl(this.serverResourcePath() ?? '');
    this.#service.select(filter).subscribe((response) => {
      this.data.set(response);
      this.loadingData = false;
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
