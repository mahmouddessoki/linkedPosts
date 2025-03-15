import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { addTokenInterceptor } from './core/interceptors/add-token.interceptor';
import { loadHandleInterceptor } from './core/interceptors/load-handle.interceptor';
import { errorHandleInterceptor } from './core/interceptors/error-handle.interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([addTokenInterceptor, loadHandleInterceptor, errorHandleInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule)
  ]
};
