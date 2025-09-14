import { Component, inject, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { STORAGE_KEYS } from '../../../shared/constants/storage-keys';
import { TranslatePipe } from '../../../shared/pipes/translate/translate.pipe';
import { FormFieldComponent } from '../../../shared/components/form/form-field/form-field.component';
import { FormFieldType } from '../../../shared/enums/form-field-type.enum';
import { finalize } from 'rxjs';
import { LoadingContainerComponent } from '../../../shared/components/loading-container/loading-container.component';
import { checkInvalidFields } from '../../../shared/helpers/form/form.helper';
@Component({
  selector: 'vr-login',
  imports: [
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzFormModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe,
    FormFieldComponent,
    LoadingContainerComponent,
  ],
  providers: [TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #authService = inject(AuthService);
  #fb = inject(NonNullableFormBuilder);

  loginForm!: FormGroup;
  passwordVisible = false;
  isLoading = false;
  #returnUrl: string | null = null;

  FormFieldType = FormFieldType;

  ngOnInit(): void {
    const email = localStorage.getItem(STORAGE_KEYS.REMEMBERME);
    this.loginForm = this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: !!email,
    });
    if (email) {
      this.loginForm.patchValue({ email });
      this.loginForm.controls['email'].markAsTouched();
    }

    this.#returnUrl = this.#route.snapshot.queryParamMap.get('returnUrl');
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.#authService
        .login(this.loginForm.value, this.#returnUrl)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe();
    } else {
      checkInvalidFields(this.loginForm);
    }
  }

  getControl(name: string): AbstractControl {
    return this.loginForm.get(name) as AbstractControl;
  }

  forgotPassword() {
    console.log('forgotPassword');
  }
}
