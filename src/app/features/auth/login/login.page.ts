import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Authentication } from '../../../layout/authentication/authentication.layout';
import { Head } from '../../../shared/components/head/head';
import { AuthenticationApi } from '../../../core/data-access/authentication/authentication.api';
import { toast } from 'ngx-sonner';
import { form, FormField, minLength, pattern, required } from '@angular/forms/signals';
import { AuthStore } from '../../../core/stores/auth.store';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [RouterLink, Authentication, Head, FormField],
  templateUrl: './login.page.html',
})
export class Login {
  loginModel = signal<LoginForm>({
    username: 'jon_dev',
    password: 'Arbellpogi23@',
  });

  showPassword = signal(false);

  toggleShowPassword() {
    this.showPassword.set(!this.showPassword());
  }

  googleLogin() {
    window.location.href = this.authApi.googleAuth();
  }

  loginForm = form(this.loginModel, (schema) => {
    required(schema.username, { message: 'Username is required.' });

    minLength(schema.username, 2, { message: 'Username must be at least 2 characters.' });

    minLength(schema.password, 8, { message: 'Password must be at least 8 characters.' });

    required(schema.password, { message: 'Password is required.' });

    pattern(schema.password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
      message: 'Password must include letters and numbers.',
    });
  });

  formErrors = signal({
    username: [],
    password: [],
  });

  passwordLength = computed(() => this.loginForm.password().value.length);

  constructor(
    private authApi: AuthenticationApi,
    private authStore: AuthStore,
    private router: Router,
  ) {}

  handleLogin(): void {
    const { username, password } = this.loginModel();

    this.authApi.login(username, password).subscribe({
      next: (res) => {
        this.authStore.setToken(res.data.token, 'token');
        this.authStore.setToken(res.data.refreshToken, 'refreshToken');

        console.log(`Token : ${this.authStore.getToken('token')}`);

        this.router.navigate(['']);
      },
      error: (e: HttpErrorResponse) => {
        if (e.status === 0) {
          toast.error('Cannot connect to server. Please try again later.');
        } else {
          toast.error(e.error?.message);
        }
      },
    });
  }
}
