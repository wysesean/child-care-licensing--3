// NGRX
import { Action } from '@ngrx/store';
// MODELS
import { RouterPayload } from '../models/';

export enum ActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back',
  Refresh = '[Router] Refresh'
}

/** Angular Router-style navigation */
export class Go implements Action {
  readonly type = ActionTypes.Go;
  constructor(public payload: RouterPayload) { }
}

export class Back implements Action {
  readonly type = ActionTypes.Back;
}

/** Action for refreshing current page */
export class Refresh implements Action {
  readonly type = ActionTypes.Refresh;
}

export type RouterActions = Go | Back | Refresh;
