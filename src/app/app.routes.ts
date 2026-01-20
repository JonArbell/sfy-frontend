import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard.page';
import { Urls } from './features/urls/urls.page';
import { Signup } from './features/auth/signup/signup.page';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password.page';
import { Profile } from './features/profile/profile.page';
import { canActivateGuard } from './core/middlewares/guards/can-activate-guard';
import { Index } from './features/index/index.page';
import { Visitors } from './features/visitors/visitors.page';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [canActivateGuard],
    data: { authRequired: true },
  },
  {
    path: 'urls',
    component: Urls,
    canActivate: [canActivateGuard],
    data: { authRequired: true },
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [canActivateGuard],
    data: { authRequired: true },
  },
  {
    path: '',
    component: Index,
    canActivate: [canActivateGuard],
    data: { guestOnly: true, authRequired: true },
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
    canActivate: [canActivateGuard],
    data: { guestOnly: true },
  },
  {
    path: 'sign-up',
    component: Signup,
    canActivate: [canActivateGuard],
    data: { guestOnly: true },
  },
  {
    path: 'visitors',
    component: Visitors,
    canActivate: [canActivateGuard],
    data: { authRequired: true },
  },
];
