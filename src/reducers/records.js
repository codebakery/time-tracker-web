import types from '../actions/records';

export const emptyRecord = {
  id: null,
  project: '',
  time_spent: '',
  issue: '',
  description: '',
};


const initialState = {
  loading: false,
  recordList: [emptyRecord, emptyRecord, emptyRecord, emptyRecord, emptyRecord],
  errors: {},
};


function recordListReducer(state, action) {
  switch (action.type) {
    case types.RECORDS_LOAD_SUCCESS:
      return [...action.records, ...state];

    case types.RECORD_SUBMIT_SUCCESS:
      return [...state.slice(0, action.index), action.record,...state.slice(action.index + 1)];

    case types.RECORD_REMOVE_SUCCESS:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];

    case types.ADD:
      return [...state, emptyRecord];

    case types.EDIT:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {[action.field]: action.value}),
        ...state.slice(action.index + 1),
      ];

    default:
      return state;
  }
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.RECORDS_LOAD_REQUEST:
    case types.RECORD_SUBMIT_REQUEST:
    case types.RECORD_REMOVE_REQUEST:
      return { ...state, loading: true };

    case types.RECORDS_LOAD_SUCCESS:
    case types.RECORD_SUBMIT_SUCCESS:
    case types.RECORD_REMOVE_SUCCESS:
      return { recordList: recordListReducer(state.recordList, action), errors: [], loading: false };

    case types.RECORDS_LOAD_FAILURE:
    case types.RECORD_REMOVE_FAILURE:
    case types.RESET:
      return initialState;

    case types.RECORD_SUBMIT_FAILURE:
      return {...state, errors: action.errors, loading: false };

    default:
      return {...state, recordList: recordListReducer(state.recordList, action)};
  }
}
