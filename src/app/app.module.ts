import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './containers/app';
import { DetailsSectionComponent } from './containers/details-section';
import { SearchSectionComponent } from './containers/search-section';
import { ComponentsModule } from './components';
import { MaterialModule } from './material.module';
import { ServicesModule } from './services';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, CustomSerializer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MapEffects, RouterEffects } from './effects';
import { PipesModule } from './pipes';
import { routes } from './routes';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent, DetailsSectionComponent, SearchSectionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    FormsModule,
    MaterialModule,
    ServicesModule,
    ReactiveFormsModule,
    PipesModule,
    StoreRouterConnectingModule,
    EffectsModule.forRoot([MapEffects, RouterEffects]),
    RouterModule.forRoot(routes, { useHash: false }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 50 })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
