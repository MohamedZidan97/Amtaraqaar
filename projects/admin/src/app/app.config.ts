import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers:  [ 
  //provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withFetch()), // Removed `withFetch` as it is not standard Angular
  
  importProvidersFrom(
    BrowserAnimationsModule, // Required for Toastr
    ToastrModule.forRoot()   // Global Toastr configuration
  )
  // {
  //   //provide: HTTP_INTERCEPTORS,
  //   //useClass: TokenInterceptor,
  //   //multi: true
  // }
  ]};
