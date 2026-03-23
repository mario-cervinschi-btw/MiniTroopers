import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
  provideAppInitializer,
  inject,
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
import { TABLE_PREF_KEY } from './shared/store/user-table/user-table.selector';
import { userTableReducer } from './shared/store/user-table/user-table.reducer';
import { UserTableEffects } from './shared/store/user-table/user-table.effects';
import { UI_KEY } from './shared/store/ui/ui.selector';
import { uiReducer } from './shared/store/ui/ui.reducer';
import { UiEffects } from './shared/store/ui/ui.effects';
import { AuthFacade } from './shared/store/auth/auth.facade';
import { filter, take } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCustomIcons(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      [AUTH_FEATURE_KEY]: authReducer,
      [TABLE_PREF_KEY]: userTableReducer,
      [UI_KEY]: uiReducer,
    }),
    provideEffects(AuthEffects, UserTableEffects, UiEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAppInitializer(() => {
      const authFacade = inject(AuthFacade);

      authFacade.init();

      // return authFacade.isAuthInitialized$.pipe(
      //   filter((isAuthInitialized: boolean) => isAuthInitialized === true),
      //   take(1),
      // );
    }),
  ],
};
