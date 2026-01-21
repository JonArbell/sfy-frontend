import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authCallbackGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = route.queryParamMap.get('token');
  const refreshToken = route.queryParamMap.get('refreshToken');

  if (token && refreshToken) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
