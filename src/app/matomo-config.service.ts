import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatomoConfiguration } from '@ngx-matomo/tracker';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatomoConfigService {

  constructor(private http: HttpClient) { }

  // "dummy" data, otherwise tracker throws due to null properties
  myBackendConfig: any = { trackerUrl: 'https://matomo.dv.local', siteId: '0' };

  async preload() {
    console.log('preload');

    this.myBackendConfig = await firstValueFrom(this.http.get(environment.matomoConfigEndpoint));

    console.log('preloaded', this.myBackendConfig);
  }

  buildConfig(): MatomoConfiguration {
    console.log('buildConfig');
    
    return {
      siteId: this.myBackendConfig.siteId,
      trackerUrl: this.myBackendConfig.trackerUrl
    };
  }
}
