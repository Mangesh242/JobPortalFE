import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './login/create-password/create-password.component';
import { EnterOtpComponent } from './login/enter-otp/enter-otp.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'forgotp', component: ForgotPasswordComponent },
  { path: 'create-new-password', component: CreateNewPasswordComponent },
  { path: 'enter-otp', component: EnterOtpComponent },
  { path: 'dashboard', component: DashboardComponent },
];
