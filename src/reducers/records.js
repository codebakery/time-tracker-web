import types from '../actions/records';

const initialState = {
  loading: false,
  recordList: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.RECORDS_LOAD_REQUEST:
      return { ...state, loading: true };

    case types.RECORDS_LOAD_SUCCESS:
      return { ...state, recordList: action.records, loading: false };

    case types.RECORDS_LOAD_FAILURE:
      return initialState;

    default:
      return state;
  }
}
