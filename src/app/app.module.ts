import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MATOMO_CONFIGURATION, NgxMatomoTrackerModule } from '@ngx-matomo/tracker';
import { NgxMatomoRouterModule } from '@ngx-matomo/router';
import { MatomoConfigService } from './matomo-config.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxMatomoTrackerModule,
    // NgxMatomoRouterModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMatomoFactory,
      deps: [MatomoConfigService],
      multi: true
    },
    {
      provide: MATOMO_CONFIGURATION,
      useFactory: matomoConfigFactory,
      deps: [MatomoConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initializeMatomoFactory(service: MatomoConfigService) {
  console.log('initializeMatomoFactory');
  
  return () => service.preload();
}

export function matomoConfigFactory(service: MatomoConfigService) {
  console.log('matomoConfigFactory');
  
  return service.buildConfig();
}