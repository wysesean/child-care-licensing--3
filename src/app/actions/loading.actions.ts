// NGRX
import { Action } from '@ngrx/store';

export enum ActionTypes {
  Increment = '[Loading] Increment',
  Decrement = '[Loading] Decrement'
}

/** Increment the loading queue once. Remember to decrement the queue when loading is complete. */
export class Increment implements Action {
  readonly type = ActionTypes.Increment;
}

/** Decrement the loading queue once */
export class Decrement implements Action {
  readonly type = ActionTypes.Decrement;
}

export type Actions = Increment | Decrement;
