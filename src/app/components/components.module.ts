// ANGULAR
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MATERIAL
import { MaterialModule } from '../material.module';
// COMPONENTS

import { MapDirective } from './map.directive';
import { ToolBarComponent } from './tool-bar';
import { SearchFilterComponent } from './search-filter';
import { SingleChildCareSiteComponent } from './single-child-care-site';
import { ChildCareSiteListComponent } from './child-care-site-list';
import { LoadingBarComponent } from './loading-bar';
import { DividerComponent } from './divider';

// OTHER
import { PipesModule } from '../pipes';

const components = [
  MapDirective,
  ToolBarComponent,
  SearchFilterComponent,
  SingleChildCareSiteComponent,
  ChildCareSiteListComponent,
  LoadingBarComponent,
  DividerComponent,
];

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule, PipesModule],
  declarations: components,
  exports: components,
  entryComponents: []
})
export class ComponentsModule {}
