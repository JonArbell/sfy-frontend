import { HttpInterceptorFn, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { catchError, switchMap, throwError, from, lastValueFrom } from 'rxjs';
import { inject } from '@angular/core';
import { AuthStore } from '../../stores/auth.store';
import { Router } from '@angular/router';

let refreshPromise: Promise<string> | null = null;

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const BACKEND_URL = environment.backendBaseUrlAPI;
  const authStore = inject(AuthStore);

  const router = inject(Router);

  const http = inject(HttpClient);

  const unAuthenticatedEndpoints = ['/login', '/register', '/forgot-password'];

  const unAuthenticatedEndpoint = unAuthenticatedEndpoints.some(e =>
    req.url.includes(e)
  );

  const apiReq = req.clone({
    url: `${BACKEND_URL}${req.url}`,
    setHeaders: getAuthHeader(authStore)
  });

  if(
    !authStore.getToken('refreshToken') &&
    unAuthenticatedEndpoint
  ){

    return next(apiReq);
  }

  if (
      !authStore.getToken('refreshToken') &&
      !unAuthenticatedEndpoint
    ) {

    authStore.removeTokens();
    authStore.removeMyAccount();
    router.navigate(['/']);
    throw throwError(() => new Error("Your session has expired. Please log in again."));
  }

  return next(apiReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {

        if (!refreshPromise) {
          refreshPromise = lastValueFrom(
            http.post<{data : {
              token : string
            }}>(`/refresh`, {
              refreshToken: authStore.getToken('refreshToken')
            })
          ).then(res => {
            authStore.setToken(res.data.token, 'token');
            refreshPromise = null;
            return res.data.token;
          }).catch(err => {

            refreshPromise = null;
            authStore.removeTokens();
            authStore.removeMyAccount();
            // toast.error('Session expired. Please log in again.');
            throw throwError(() => new Error("Session expired. Please log in again."));
          });
        }

        return from(refreshPromise).pipe(
          switchMap(newToken => {
            const retryReq = req.clone({
              url: `${BACKEND_URL}${req.url}`,
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });

            return next(retryReq);
          })
        );
      }else if (error.status === 0){

        return throwError(() => new Error("Can't connect to server. Please try again later."));
      }

      return throwError(() => error);
    })
  );
};

const getAuthHeader = (authStore: AuthStore): { [header: string]: string } => {
  const token = authStore.getToken('token');
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
};
