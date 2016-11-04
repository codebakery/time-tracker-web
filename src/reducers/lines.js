import types from '../actions/lines';

const emptyLine = {
  project: null,
  hours: '',
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

    default:
      return state;
  }
}
