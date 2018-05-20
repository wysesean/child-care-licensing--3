// NGRX
import { Store, select } from '@ngrx/store';
import * as store from '../../store/';
import { Component, Input, OnInit } from '@angular/core';
import { Operation } from '../../models';
import { Observable } from 'rxjs';
import { mapActions } from '../../actions';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.scss']
})
export class DetailsSectionComponent implements OnInit{
  thing$: Observable<any>;
  operations$: Observable<Operation>;
  activity$: Observable<any>;
  nonCompliance$: Observable<any>;

  // const operation_id = this.window.location.href;
  constructor(private _store$: Store<store.State>) {
    this.thing$ = this._store$.pipe(select(store.getSingleSelected)).pipe(filter(x => !!x), map(x => x.data));
    this.operations$ = this.thing$.pipe(map(x => x.operations[0]));
    this.activity$ = this.thing$.pipe(map(x => x.activity));
    this.nonCompliance$ = this.thing$.pipe(map(x => x.nonCompliance));
  }
  ngOnInit(){
    this.operations$.subscribe(console.log)
    this.activity$.subscribe(x => console.log('activ', x));
    this.nonCompliance$.subscribe(y => console.log('non', y));
  }
  geolocate() {
    this.operations$.subscribe(x => {
      console.log(x);
      this._store$.dispatch(new mapActions.ZoomTo({
        center: x.location_address_geo.coordinates
      }));
    });
  }
}
