// ANGULAR
import { Routes } from '@angular/router';
// COMPONENTS
import { AppComponent } from './containers';
import { DetailsSectionComponent } from './containers/details-section';
import { SearchSectionComponent } from './containers/search-section';
// ROUTEGUARD

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: SearchSectionComponent,
  },
  {
    path: 'details/:id',
    component: DetailsSectionComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
