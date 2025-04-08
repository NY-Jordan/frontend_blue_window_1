import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPage } from './presentation/pages/auth/login/login';
import { RegisterPage } from './presentation/pages/auth/register/register';
import { TaskPage } from './presentation/pages/tasks/tasks';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginPage },
  { path: 'auth/register', component: RegisterPage },
  { path: 'dasboard', component: TaskPage },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
];
