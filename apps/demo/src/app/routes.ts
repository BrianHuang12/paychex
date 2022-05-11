import { Routes } from '@angular/router';
import { AuthGuard } from '@paychex/demo-lib/auth';
import { ShellLayoutComponent } from '@paychex/demo-lib/shell-layout';

export const DEMO_ROUTES: Routes = [
  {
    component: ShellLayoutComponent,
    canActivate: [AuthGuard],
    path: '',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@paychex/demo-lib/login').then((m) => m.LoginModule),
  },
];
