import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../stores/auth.store';

export const canActivateGuard: CanActivateFn = (route, state) => {

  const authStore = inject(AuthStore);
  const router = inject(Router);

  const isAuthenticated = authStore.authenticated();

  const authRequired = route.data['authRequired'] ?? false;
  const guestOnly = route.data['guestOnly'] ?? false;

  if(authRequired && guestOnly)
    return true;

  if (authRequired && !isAuthenticated) {
    return router.parseUrl('/');
  }

  if (guestOnly && isAuthenticated) {
    return router.parseUrl('/dashboard');
  }

  return true;
};
