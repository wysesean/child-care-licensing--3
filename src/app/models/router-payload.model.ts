import { NavigationExtras, Params } from '@angular/router';

// Used to navigate
export interface RouterPayload {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}

// Payload recieved from ngrx Router
export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  entityType: string;
}
