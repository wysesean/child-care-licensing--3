import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTabsModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatSelectModule
} from '@angular/material';

const matModules = [
  MatTabsModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatSelectModule
];

@NgModule({
  imports: [CommonModule, ...matModules],
  declarations: [],
  exports: matModules
})
export class MaterialModule {}
