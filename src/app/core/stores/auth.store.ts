import { computed, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MyAccountResponseDTO } from '../../shared/types/my-account.type';
import { Router } from '@angular/router';
import { MyAccount as MyAccountDataAccess } from '../data-access/my-account/my-account.api';
import { toast } from 'ngx-sonner';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthProvider } from '../../shared/types/auth-provider.enum';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private token = signal<string | null>(null);

  private refreshToken = signal<string | null>(null);

  private myAccount = signal<MyAccountResponseDTO>({
    id: '',
    username: '',
    fullName: '',
    email: null,
    icon: null,
    provider: AuthProvider.LOCAL,
    createdAt: null,
    updatedAt: null,
  });

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private myAccountDataAccess: MyAccountDataAccess,
  ) {
    this.token.set(cookieService.get('token'));
    this.refreshToken.set(cookieService.get('refreshToken'));
  }

  authenticated = computed(() => !!this.token() || !!this.refreshToken());

  setToken(token: string, tokenType: 'token' | 'refreshToken') {
    this.cookieService.set(tokenType, token, {
      path: '/',
      sameSite: 'None',
      secure: false,
    });

    if (tokenType === 'token') {
      this.token.set(token);
    } else {
      this.refreshToken.set(token);
    }
  }

  setMyAccount(myAccount: MyAccountResponseDTO) {
    this.myAccount.set(myAccount);

    console.log(this.getMyAccount());
  }

  getToken(tokenType: 'token' | 'refreshToken'): string | null {
    if (tokenType === 'token') return this.token();

    return this.refreshToken();
  }

  getMyAccount(): MyAccountResponseDTO {
    return this.myAccount();
  }

  removeTokens() {
    this.cookieService.delete('token');
    this.cookieService.delete('refreshToken');
    this.token.set(null);
    this.refreshToken.set(null);
  }

  removeMyAccount() {
    this.myAccount.set({
      id: '',
      username: '',
      fullName: '',
      email: null,
      icon: null,
      provider: AuthProvider.LOCAL,
      createdAt: null,
      updatedAt: null,
    });
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }

  loadMyAccount() {
    this.myAccountDataAccess.fetchMyAccount().subscribe({
      next: (val) => this.setMyAccount(val.data),
      error: (err: HttpErrorResponse) => toast.error(err.message),
    });
  }
}
