import { Routes } from '@angular/router';

export const DEMO_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@paychex/demo-lib/login').then((m) => m.LoginModule),
  },
];
