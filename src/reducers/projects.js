import types from '../actions/projects';

const initialState = {
  loading: false,
  projectList: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.PROJECTS_LOAD_REQUEST:
      return { ...state, loading: true };

    case types.PROJECTS_LOAD_SUCCESS:
      return { ...state, projectList: action.projects, loading: false };

    case types.PROJECTS_LOAD_FAILURE:
      return initialState;

    default:
      return state;
  }
}
