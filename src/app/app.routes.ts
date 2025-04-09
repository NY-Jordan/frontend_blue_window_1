import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPage } from './presentation/pages/auth/login/login';
import { RegisterPage } from './presentation/pages/auth/register/register';
import { TaskPage } from './presentation/pages/tasks/tasks';
import { AuthGuard } from './infrasctructure/configurations/guards/auth.guard';
import { NoAuthGuard } from './infrasctructure/configurations/guards/noauth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginPage,     canActivate: [NoAuthGuard]},
  { path: 'auth/register', component: RegisterPage ,     canActivate: [NoAuthGuard]},
  { path: 'dashboard', component: TaskPage, canActivate: [AuthGuard] },
];
