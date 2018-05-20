import { RouterStateSnapshot } from '@angular/router';
// NGRX
import { ActionReducerMap, createSelector, ActionReducer, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromMap from './map.reducer';
import * as fromLoading from './loading.reducer';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../models';

export interface State {
  map: fromMap.State;
  loading: fromLoading.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  map: fromMap.reducer,
  loading: fromLoading.reducer,
  router: fromRouter.routerReducer,
};

/** console.log all actions */
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('store', 'state', state);
    console.log('store', 'action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? // ? [logger, storeFreeze] // uncomment for state logging
    [storeFreeze]
  : [];

// -------------- MAP --------------
export const getMapState = (state: State) => state.map;
export const getFeatToZoom = createSelector(getMapState, fromMap.getFeatToZoom);
export const getOperations = createSelector(getMapState, fromMap.getOperations);
export const getFilterQuery = createSelector(getMapState, fromMap.getFilterQuery);
export const getSelectedOperation = createSelector(getMapState, fromMap.getSelectedOperationId);
export const getFilterIds = createSelector(getMapState, fromMap.getFilteredIds);
export const getSingleSelected = createSelector(getMapState, fromMap.getSingleOperation);
// -------------- LOADING --------------
export const getLoadingQueueState = (state: State) => state.loading;
export const getIsLoading = createSelector(getLoadingQueueState, fromLoading.getIsLoading);


// -------------- ROUTER --------------
export const getRouterState = (state: State) => state.router;
export const getRouterSnapshotState = createSelector(getRouterState, snapshot => snapshot.state);
export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;
    const pathSections = url.split('/');
    // create entity type from first path section, excluding params
    const entityType = pathSections[1].match(/[^?]*/i)[0];
    return { url, params, queryParams, entityType };
  }
}
