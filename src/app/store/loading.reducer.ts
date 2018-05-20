// NGRX
import { createSelector } from '@ngrx/store';
import { loadingActions, mapActions } from '../actions';

export interface State {
  itemCount: number;
}

const initialState: State = {
  itemCount: 0
};

export function reducer(state = initialState, action: loadingActions.Actions | mapActions.Actions): State {
  switch (action.type) {
    // ------------- INCREMENT -------------
    case loadingActions.ActionTypes.Increment:
    case mapActions.ActionTypes.LoadOperations: {
      return { itemCount: state.itemCount + 1 };
    }
    // ------------- DECREMENT -------------
    case loadingActions.ActionTypes.Decrement:
    case mapActions.ActionTypes.LoadOperationsError:
    case mapActions.ActionTypes.LoadOperationsSuccess: {
      return { itemCount: state.itemCount - 1 };
    }
    default: {
      return state;
    }
  }
}

export const getItemCount = (state: State) => state.itemCount;
export const getIsLoading = createSelector(getItemCount, count => count > 0);
