import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from '../../../core/stores/auth.store';
import { Authentication } from '../../../layout/authentication/authentication.layout';
import { Head } from '../../../shared/components/head/head';
@Component({
  selector: 'app-auth-callback',
  imports: [Authentication, Head],
  templateUrl: './auth-callback.page.html',
})
export class AuthCallback {
  constructor(
    private authStore: AuthStore,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const refreshToken = params['refreshToken'];

      this.ngZone.run(() => {
        if (token && refreshToken) {
          this.authStore.setToken(token, 'token');
          this.authStore.setToken(refreshToken, 'refreshToken');
        }

        this.router.navigate(['/']);
      });
    });
  }
}
