import types from '../actions/auth';

const initialState = {
  authorized: undefined,
  currentUser: null,
  errors: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, currentUser: action.currentUser, errors: [], authorized: true };

    case types.LOGIN_FAILURE:
      return { ...state, currentUser: null, errors: action.errors, authorized: false };

    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
