// NGRX
import { Store, select } from '@ngrx/store';
import * as store from '../../store/';
import { Component, Input } from '@angular/core';
import { Operation } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent {
  operations$: Observable<Operation[]>;
  constructor(private _store$: Store<store.State>) {
    this.operations$ = this._store$.pipe(select(store.getOperations));
  }
}
