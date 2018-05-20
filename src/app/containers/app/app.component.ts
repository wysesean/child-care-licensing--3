import { Component, HostBinding, OnInit } from '@angular/core';
// NGRX
import { Store, select } from '@ngrx/store';
import * as store from '../../store/';
import { Observable } from 'rxjs';
// MODEL
import { mapControl, MapZoom, Operation } from '../../models';
// UTIL
import { mapActions, routerActions } from '../../actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class.app-root') cssClass = true;
  featToZoom$: Observable<MapZoom>;
  // TO DO: Add sites
  isLoading$: Observable<boolean>;
  filteredIds: Observable<any>;
  mapControls = [
    // configurable map controls based on controls enum
    mapControl.geolocate,
    mapControl.home,
    mapControl.nav,
    mapControl.pointer,
    mapControl.geocoder,
    mapControl.featureClick
  ];

  constructor(private _store$: Store<store.State>, private _router: Router) {
    this.featToZoom$ = this._store$.pipe(select(store.getFeatToZoom));
    this.isLoading$ = this._store$.pipe(select(store.getIsLoading));
    this.filteredIds = this._store$.pipe(select(store.getFilterIds));
  }

  ngOnInit() {
  }

  onFeatureClick(evt) {
    console.log(evt.OPERATION_ID);
    this._store$.dispatch(new routerActions.Go({ path: ['/details', evt.OPERATION_ID]}));
  }
}
