// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// SERVICES
import { MapService } from './map.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [MapService]
})
export class ServicesModule {}
