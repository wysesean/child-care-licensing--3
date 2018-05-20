// NGRX
import { mapActions } from '../actions';
// MODELS
import { MapZoom, mockData, Operation } from '../models';
import { createSelector } from '@ngrx/store';
// UTILS

export interface State {
  featToZoom: MapZoom;
  operations: Operation[];
  selectedOperationId: string;
  filterQuery: string;
  singleOperation: any;
}

const initialState: State = {
  featToZoom: null,
  operations: null,
  selectedOperationId: null,
  filterQuery: null,
  singleOperation: null,
};

export function reducer(state = initialState, action: mapActions.Actions): State {
  switch (action.type) {
    case mapActions.ActionTypes.ZoomTo: {
      return {
        ...state,
        featToZoom: action.payload
      };
    }
    case mapActions.ActionTypes.LoadOperationsSuccess: {
      const formatted = formatPayload(action.payload.data);
      return {
        ...state,
        operations: formatted
      };
    }
    case mapActions.ActionTypes.LoadSingleOperationSuccess: {
      return {
        ...state,
        singleOperation: action.payload
      };
    }
    case mapActions.ActionTypes.ClearSingleSelected: {
      return {
        ...state,
        singleOperation: null
      };
    }
    default: {
      return state;
    }
  }
}

export const getMapState = (state: State) => state;
export const getFeatToZoom = (state: State) => state.featToZoom;
export const getOp = (state: State) => state.operations;
export const getOperations = createSelector(getMapState, getOp, (mapState, operations) => {
  return operations;
});
export const getSingleOp = (state: State) => state.singleOperation;
export const getSingleOperation = createSelector(getMapState, getSingleOp, (mapState, singleOperation) => {
  return singleOperation;
});
export const getSelectedOperationId = (state: State) => state.selectedOperationId;
export const getFilterQuery = (state: State) => state.filterQuery;
export const getFilteredIds = createSelector(getOp, (operation) => {
  if (operation) {
  return operation.map(x => {
    return x.operation_id;
  });
  } else {
    return [];
  }
});

function formatPayload(sites) {
  return sites.map((obj) => {
  let key, keys = Object.keys(obj);
  let n = keys.length;
  let newobj = {}
  while (n--) {
    key = keys[n];
    newobj[key.toLowerCase()] = obj[key];
  }
  return newobj;

  });
}
