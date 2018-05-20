// NGRX
import { Action } from '@ngrx/store';
// MODELS
import { MapZoom } from '../models';
import { GeoJSONGeometry } from 'mapbox-gl';
import { FeatureCollection, GeometryObject } from 'geojson';

export enum ActionTypes {
  ZoomTo = '[Map] Zoom To',
  LoadOperations = '[Map] Load Operations',
  LoadOperationsSuccess = '[Map] Load Operations Success',
  LoadOperationsError = '[Map] Load Operations',
  LoadSingleOperation = '[Map] Load Single Operation',
  LoadSingleOperationSuccess = '[Map] Load Single Operation Success',
  LoadSingleOperationError = '[Map] Load Single Operation Error',
  ClearSingleSelected = '[Map] Clear Single'
}

/** Zoom to a given feature */
export class ZoomTo implements Action {
  readonly type = ActionTypes.ZoomTo;
  constructor(public payload: MapZoom) { }
}

/** Loading data */
export class LoadOperations implements Action {
  readonly type = ActionTypes.LoadOperations;
  constructor(public payload: {query: string}) {}
}


export class LoadOperationsSuccess implements Action {
  readonly type = ActionTypes.LoadOperationsSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadOperationsError implements Action {
  readonly type = ActionTypes.LoadOperationsError;
}

/** Loading data */
export class LoadSingleOperation implements Action {
  readonly type = ActionTypes.LoadSingleOperation;
  constructor(public payload: { query: string }) { }
}


export class LoadSingleOperationSuccess implements Action {
  readonly type = ActionTypes.LoadSingleOperationSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadSingleOperationError implements Action {
  readonly type = ActionTypes.LoadOperationsError;
}

export class ClearSingleSelected implements Action {
  readonly type = ActionTypes.ClearSingleSelected;
}

export type Actions = ZoomTo
| LoadOperations
| LoadOperationsSuccess
| LoadOperationsError
| LoadSingleOperation
| LoadSingleOperationSuccess
| LoadSingleOperationError
| ClearSingleSelected;
