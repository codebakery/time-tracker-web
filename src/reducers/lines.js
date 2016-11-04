import types from '../actions/lines';

export const emptyLine = {
  project: '',
  time_spent: '',
  issue: '',
  comment: '',
};

const initialState = [emptyLine, emptyLine, emptyLine, emptyLine, emptyLine];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.ADD:
      return [...state, emptyLine];

    case types.REMOVE:
      return state.length > 1 ? state.slice(0, -1) : state;

    case types.EDIT:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {[action.field]: action.value}),
        ...state.slice(action.index + 1),
      ];

    case types.CLEAR_LINE:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];

    case types.CLEAR:
      return initialState;

    default:
      return state;
  }
}
