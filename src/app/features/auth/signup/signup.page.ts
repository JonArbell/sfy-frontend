import { Component, signal } from '@angular/core';
import { Authentication } from '../../../layout/authentication/authentication.layout';
import { RouterLink } from '@angular/router';

import { provideIcons } from '@ng-icons/core';

import { lucideMail, lucideLock, lucideUser } from '@ng-icons/lucide';
import { Title } from '@angular/platform-browser';
import { Head } from '../../../shared/components/head/head';
import { AuthenticationApi } from '../../../core/data-access/authentication/authentication.api';
import { RegisterRequestDTO } from '../../../shared/dtos/request/register-request.dto';
import {
  applyWhen,
  email,
  form,
  FormField,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-signup',
  imports: [Authentication, RouterLink, Head, FormField],
  templateUrl: './signup.page.html',
  providers: [provideIcons({ lucideMail, lucideLock, lucideUser })],
})
export class Signup {
  constructor(private authApi: AuthenticationApi) {}

  registerModel = signal<RegisterRequestDTO>({
    fullName: '',
    confirmPassword: '',
    email: '',
    password: '',
    username: '',
  });

  formErrors = signal({
    fullName: [],
    username: [],
    password: [],
    confirmPassword: [],
    email: [],
  });

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.username, { message: 'Username is required' });
    minLength(schemaPath.username, 4, { message: 'Min 4 characters' });

    required(schemaPath.fullName, { message: 'Full name is required' });
    minLength(schemaPath.fullName, 2);

    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Invalid email address' });

    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Minimum 8 characters' });
    pattern(schemaPath.password, /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message: 'Password must contain uppercase, lowercase, number, special char',
    });

    applyWhen(
      schemaPath.confirmPassword,
      ({ valueOf }) => valueOf(schemaPath.password) !== valueOf(schemaPath.confirmPassword),
      (field) => {
        required(field);
      },
    );
  });

  handleRegister() {
    this.authApi.register(this.registerModel()).subscribe({
      next: (val) => {
        toast.success('Successfully created an account!');
      },
      error: (err) => {
        const properties = err.error?.errors?.properties;

        if (err.status === 0) {
          toast.error('Cannot connect to server. Please try again later.');
          return;
        } else if (properties) {
          this.formErrors.update((current) => ({
            username: properties.username ?? current.username,
            fullName: properties.fullName ?? current.fullName,
            email: properties.email ?? current.email,
            password: current.password,
            confirmPassword: current.confirmPassword,
          }));
        }

        toast.error(err?.error?.message || 'Failed to register. Please try again.');
      },
    });
  }
}
