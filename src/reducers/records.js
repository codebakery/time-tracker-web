import types from '../actions/records';

const initialState = {
  loading: false,
  recordList: [],
  errors: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.RECORDS_LOAD_REQUEST:
      return { ...state, loading: true };

    case types.RECORDS_LOAD_SUCCESS:
      return { ...state, recordList: action.records, loading: false };

    case types.RECORDS_LOAD_FAILURE:
      return initialState;


    case types.RECORD_SUBMIT_REQUEST:
      return { ...state, loading: true };

    case types.RECORD_SUBMIT_SUCCESS:
      return { ...state, recordList: [...state.recordList, action.record], errors: [], loading: false };

    case types.RECORD_SUBMIT_FAILURE:
      return {...state, errors: action.errors, loading: false };

    default:
      return state;
  }
}
