import { Component, Input, OnInit } from '@angular/core';
import { Operation } from '../../models';

@Component({
  selector: 'app-single-child-care-site',
  templateUrl: './single-child-care-site.component.html',
  styleUrls: ['./single-child-care-site.component.scss']
})
export class SingleChildCareSiteComponent {
  @Input() operation: Operation;
}
