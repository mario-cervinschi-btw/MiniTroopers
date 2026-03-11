import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideCustomIcons } from './shared/providers/icon-registry.service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AUTH_FEATURE_KEY } from './shared/store/auth/auth.selectors';
import { authReducer } from './shared/store/auth/auth.reducer';
import { AuthEffects } from './shared/store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCustomIcons(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      [AUTH_FEATURE_KEY]: authReducer,
    }),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
