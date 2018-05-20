import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Operation } from '../../models';

@Component({
  selector: 'app-child-care-site-list',
  templateUrl: './child-care-site-list.component.html',
  styleUrls: ['./child-care-site-list.component.scss']
})
export class ChildCareSiteListComponent {
  @Input() operations: Operation[];
}
