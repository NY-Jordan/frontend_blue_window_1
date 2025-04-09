import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { taskReducer } from './store/reducers/task.reducer';
import { AppState } from './store/state';
import { AuthInterceptor, AuthInterceptorProvider } from './infrasctructure/configurations/auth.interceptor';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    AuthInterceptorProvider,
    importProvidersFrom(ToastrModule.forRoot({
      timeOut: 100,
      positionClass: 'toast-bottom-right'
    })),
    BrowserAnimationsModule,
    provideStore<AppState>({
      task : taskReducer
    })]
};
