import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize.pipe';

const pipes = [
  CapitalizePipe
];

@NgModule({
  imports: [CommonModule],
  declarations: pipes,
  exports: pipes,
  providers: pipes
})
export class PipesModule { }
