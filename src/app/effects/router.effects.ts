// ANGULAR
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// NGRX
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { routerActions, mapActions } from '../actions';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// RXJS
import { merge } from 'rxjs/observable/merge';
import { map, tap, filter, switchMap } from 'rxjs/operators';
// MODELS

import * as store from '../store';
import { from } from 'rxjs/observable/from';
import { RouterStateUrl } from '../models';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this._actions$.pipe(
    ofType(routerActions.ActionTypes.Go),
    map((action: routerActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => this._router.navigate(path, { queryParams, ...extras }))
  );

  @Effect()
  navigateSingle$ = this._actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((action: RouterNavigationAction<RouterStateUrl>) => action.payload.routerState),
    filter(value => (value.entityType === 'details' ? true : false)),
    map(filteredValue => new mapActions.LoadSingleOperation({ query: `operation_id=${filteredValue.params.id}` }))
  );

  @Effect()
  navigateSearch$ = this._actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((action: RouterNavigationAction<RouterStateUrl>) => action.payload.routerState),
    filter(value => (value.entityType === 'search' ? true : false)),
    map(filteredValue => new mapActions.ClearSingleSelected())
  );

  constructor(private _actions$: Actions, private _router: Router, private _store$: Store<store.State>) {}
}
