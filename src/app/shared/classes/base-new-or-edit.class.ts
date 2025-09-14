import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { DynamicResourceService } from '../services/dynamic-resource/dynamic-resource.service';
import { inject, ChangeDetectorRef, OnInit, OnDestroy, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormConfig } from 'ng-zorro-antd/core/config';
import { AuthService } from '../../core/auth/auth.service';
import { FormFieldOptions } from '../components/form/form-field/interfaces/form-field.interface';
import { NotificationService } from '../services/notification/notification.service';
import { UserJwt } from '../interfaces/user.interface';
import { map, Subject, tap } from 'rxjs';
import { checkInvalidFields } from '../helpers/form/form.helper';
import { removeEmptyValues } from '../helpers/remove-empty-values/remove-empy-values.helper';
import { CanComponentDeactivate } from '../../core/pending-changes/pending-changes.guard';

@Component({ template: '' })
export abstract class BaseNewOrEditComponent<T> implements OnInit, OnDestroy, CanComponentDeactivate {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #fb = inject(NonNullableFormBuilder);
  #cdr = inject(ChangeDetectorRef);
  #notification = inject(NotificationService);
  #authService = inject(AuthService);

  abstract service: DynamicResourceService<T>;
  abstract fields: FormFieldOptions[];
  abstract title: string;
  abstract formConfig: FormConfig;
  abstract basePath: string;

  initialFormValues!: T;
  form!: FormGroup;
  unsubscribe$ = new Subject<void>();
  isLoading = false;
  editId!: number;
  user!: UserJwt | null;

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.#authService.user$.subscribe((user) => {
      this.user = user;
      this.buildForm();
      this.setInitialFormValues();
      this.checkIsEdit();
    });
  }

  buildForm(): void {
    this.form = this.#fb.group(this.formConfig);
  }

  checkIsEdit(): void {
    this.#route.params
      .pipe(
        map((params) => params['id']),
        tap((id) => {
          if (id !== undefined) {
            this.loadForEdit(id);
          } else {
            this.watchFormChanges();
          }
        })
      )
      .subscribe();
  }

  loadForEdit(id: number): void {
    this.isLoading = true;
    this.editId = id;
    this.service.getById(id).subscribe({
      next: (item) => this.patchValuesForEdit(item.data),
      error: () => this.#router.navigate(['../']),
      complete: () => (this.isLoading = false),
    });
  }

  patchValuesForEdit(item: T): void {
    this.form.reset();
    const values = this.buildValuesForEdit(item);
    this.form.patchValue(values);
    this.setInitialFormValues();
    this.watchFormChanges();
    this.#cdr.detectChanges();
  }

  buildValuesForEdit(item: T): Record<string, any> {
    return item as Record<string, any>;
  }

  watchFormChanges(): void {}

  submit(): void {
    if (!this.validateForm()) {
      return;
    } else if (this.editId) {
      this.update();
    } else {
      this.create();
    }

    this.#cdr.detectChanges();
  }

  validateForm(): boolean {
    if (this.form.invalid) {
      checkInvalidFields(this.form);
      this.#notification.warning('messages.frontend.required_fields');
    }

    return !this.form.invalid;
  }

  create(): void {
    const formValues = this.buildFormValuesForSubmit();
    this.service.post(formValues).subscribe((item) => {
      this.setInitialFormValues();
      this.navigateToEdit(item.data as T & { id: number });
    });
  }

  update(): void {
    const formValues = this.buildFormValuesForSubmit();
    this.service.patch(this.editId, formValues).subscribe((item) => {
      this.patchValuesForEdit(item.data);
      this.#cdr.detectChanges();
    });
  }

  setInitialFormValues(): void {
    this.initialFormValues = this.form.getRawValue() as T;
  }

  buildFormValuesForSubmit(): T {
    const formValues = this.form.getRawValue();
    return removeEmptyValues(formValues) as T;
  }

  navigateToEdit(item: T & { id: number }): void {
    this.#router.navigateByUrl(this.basePath + '/edit/' + item.id);
  }

  navigateToList(): void {
    this.#router.navigateByUrl(this.basePath);
  }

  buildFinalFormValues(): T {
    return this.form.getRawValue() as T;
  }

  hasUnsavedChanges(): boolean {
    const finalFormValues = this.buildFinalFormValues();
    return JSON.stringify(this.initialFormValues) !== JSON.stringify(finalFormValues);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
