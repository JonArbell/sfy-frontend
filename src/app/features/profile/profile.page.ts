import { Component, computed, effect, signal } from '@angular/core';
import { Head } from '../../shared/components/head/head';
import { Authenticated } from '../../layout/authenticated/authenticated.layout';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { AuthStore } from '../../core/stores/auth.store';
import { MyAccount } from '../../core/data-access/my-account/my-account.api';
import { formatToReadableDate } from '../../shared/utils/format-date.util';
import { UpdateUserCredentialsRequestDTO } from '../../shared/dtos/request/user-credential-request.dto';
import { toast } from 'ngx-sonner';
import { UserProfileRequestDTO } from '../../shared/dtos/request/user-profile-request.dto';

interface MyAccountForm {
  username: string;
  fullName: string;
  email: string;
  icon: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

interface ProfileFieldError {
  errors: string[];
}

interface ProfileErrors {
  username: ProfileFieldError;
  fullName: ProfileFieldError;
  email: ProfileFieldError;
  icon: ProfileFieldError;
  oldPassword: ProfileFieldError;
  password: ProfileFieldError;
  confirmPassword: ProfileFieldError;
}

@Component({
  selector: 'app-profile',
  imports: [Authenticated, Head, FormField],
  templateUrl: './profile.page.html',
})
export class Profile {
  successMessage = signal('');
  errorMessage = signal('');

  editBasic = signal(false);
  editSecurity = signal(false);

  formatDate = formatToReadableDate;

  user = computed(() => this.authStore.getMyAccount());

  profileModel = signal<MyAccountForm>({
    username: '',
    fullName: '',
    email: '',
    icon: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  profileModelError = signal<ProfileErrors>({
    username: { errors: [] },
    fullName: { errors: [] },
    email: { errors: [] },
    icon: { errors: [] },
    oldPassword: {
      errors: [],
    },
    password: {
      errors: [],
    },
    confirmPassword: {
      errors: [],
    },
  });

  profileForm = form(this.profileModel, (schema) => {
    required(schema.username);
    required(schema.fullName);
    required(schema.email);

    minLength(schema.password, 8);
  });

  constructor(
    private myAccountApi: MyAccount,
    private authStore: AuthStore,
  ) {
    effect(() => {
      const user = this.user();
      if (!user) return;

      this.profileModel.update((model) => ({
        ...model,
        username: user.username ?? '',
        fullName: user.fullName ?? '',
        email: user.email ?? '',
        icon: user.icon ?? '',
      }));
    });
  }

  updateProfile() {
    const form: UserProfileRequestDTO = {
      email: this.profileModel().email,
      icon: this.profileModel().icon,
      fullName: this.profileModel().fullName,
    };

    this.myAccountApi.updateProfile(form).subscribe({
      next: (val) => {
        toast.success('Profile info updated successfully.');
        this.editSecurity.set(false);

        this.profileModelError.update((current) => ({
          ...current,
          username: { errors: [] },
          fullName: { errors: [] },
          email: { errors: [] },
          icon: { errors: [] },
          oldPassword: { errors: [] },
          password: { errors: [] },
          confirmPassword: { errors: [] },
        }));
      },
      error: (err) => {
        const properties = err.error.errors.properties;

        if (properties) {
          this.profileModelError.update((current) => ({
            username: properties.username ?? current.username,
            fullName: properties.fullName ?? current.fullName,
            email: properties.email ?? current.email,
            icon: properties.icon ?? current.icon,
            oldPassword: properties.oldPassword ?? current.oldPassword,
            password: properties.password ?? current.password,
            confirmPassword: properties.confirmPassword ?? current.confirmPassword,
          }));
        }

        const message =
          err?.error?.message || 'Failed to update security settings. Please try again.';
        toast.error(message);
      },
    });
  }

  onIconChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
  }

  updateSecurity(): void {
    const credentials: UpdateUserCredentialsRequestDTO = {
      username: this.profileModel().username,
      oldPassword: this.profileModel().oldPassword,
      password: this.profileModel().password,
      confirmPassword: this.profileModel().confirmPassword,
    };

    this.myAccountApi.updateCredentials(credentials).subscribe({
      next: () => {
        toast.success('Security settings updated successfully.');
        this.editSecurity.set(false);

        this.profileModelError.update((current) => ({
          ...current,
          username: { errors: [] },
          fullName: { errors: [] },
          email: { errors: [] },
          icon: { errors: [] },
          oldPassword: { errors: [] },
          password: { errors: [] },
          confirmPassword: { errors: [] },
        }));
      },
      error: (err) => {
        const properties = err.error.errors.properties;

        if (properties) {
          this.profileModelError.update((current) => ({
            username: properties.username ?? current.username,
            fullName: properties.fullName ?? current.fullName,
            email: properties.email ?? current.email,
            icon: properties.icon ?? current.icon,
            oldPassword: properties.oldPassword ?? current.oldPassword,
            password: properties.password ?? current.password,
            confirmPassword: properties.confirmPassword ?? current.confirmPassword,
          }));
        }

        const message =
          err?.error?.message || 'Failed to update security settings. Please try again.';
        toast.error(message);
      },
    });
  }
}
