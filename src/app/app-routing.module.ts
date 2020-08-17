import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent} from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";

import { AuthGuard } from "./shared/guard/auth.guard";
import { AuthNavGuardGuard } from "./shared/guard/auth-nav-guard.guard";

const routes: Routes = [
  {
    path: '', redirectTo: '/signIn', pathMatch: 'full'
  },
  {
    path: 'signIn', component: SignInComponent, canActivate: [AuthNavGuardGuard]
  },
  {
    path: 'signUp', component: SignUpComponent, canActivate: [AuthNavGuardGuard]
  },
  {
    path: 'forgotPassword', component: ForgotPasswordComponent, canActivate: [AuthNavGuardGuard]
  },
  {
    path: 'verifyEmail', component: VerifyEmailComponent, canActivate: [AuthNavGuardGuard]
  },
  {
    path: '', component: NavbarComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'devices', loadChildren: () => import('./dashboard/devices/devices.module').then(m => m.DevicesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
