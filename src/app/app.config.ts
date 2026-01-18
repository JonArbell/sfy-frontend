import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/middlewares/interceptors/api-interceptor';
import { provideIcons } from '@ng-icons/core';
import { heroHome, heroHomeModern, heroLink, heroUsers, heroCog, heroArrowRightOnRectangle  } from '@ng-icons/heroicons/outline';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([apiInterceptor]),withFetch()),
    provideIcons({
      heroHome,
      heroHomeModern,
      heroLink,
      heroUsers,
      heroCog,
      heroArrowRightOnRectangle
    })
  ],
};
