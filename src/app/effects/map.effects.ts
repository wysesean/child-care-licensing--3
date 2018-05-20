// ANGULAR
import { Injectable } from '@angular/core';
// NGRX
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mapActions } from '../actions';
import { MapService } from '../services';
// RXJS
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, finalize, first } from 'rxjs/operators';
// MODELS
// UTILS
// import * as state from '../../assets/states.json';


@Injectable()
export class MapEffects {
  constructor(private _actions$: Actions, private _mapService: MapService) {}

  @Effect()
  rootEffect$: Observable<Action> = this._actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    first(),
    map(() => new mapActions.LoadOperations({ query: '$limit=1000' }))
  );

  @Effect()
  loadOperations$: Observable<Action> = this._actions$.pipe(
    ofType(mapActions.ActionTypes.LoadOperations),
    map((action: mapActions.LoadOperations) => action.payload),
    switchMap(({query}) => {
      return this._mapService
        .fetchOperations(query)
        .pipe(
          map(operations => new mapActions.LoadOperationsSuccess({data: operations})),
          catchError(err => of(new mapActions.LoadOperationsError()))
        );
    })
  );

  @Effect()
  loadSingle$ = this._actions$.pipe(
    ofType(mapActions.ActionTypes.LoadSingleOperation),
    map((action: mapActions.LoadSingleOperation) => action.payload),
    switchMap(({query}) => {
      return this._mapService
        .fetchSingleOperation(query)
        .pipe(
          map(operations => new mapActions.LoadSingleOperationSuccess({ data: operations })),
          catchError(err => of(new mapActions.LoadSingleOperationError()))
        );
    })
  );
}
