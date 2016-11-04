import * as api from '../api';

const types = {
  PROJECTS_LOAD_REQUEST: 'PROJECTS/PROJECTS_LOAD_REQUEST',
  PROJECTS_LOAD_SUCCESS: 'PROJECTS/PROJECTS_LOAD_SUCCESS',
  PROJECTS_LOAD_FAILURE: 'PROJECTS/PROJECTS_LOAD_FAILURE',
};
export default types;

export const projectsLoadSuccess = (projects) => ({ type: types.PROJECTS_LOAD_SUCCESS, projects });
export const projectsLoadFailure = () => ({ type: types.PROJECTS_LOAD_FAILURE });

export const projectsLoadRequest = () => dispatch => {
  dispatch({
    type: types.PROJECTS_LOAD_REQUEST,
  });
  return api.getProjects().then((response) => {
    if (response.ok) {
      dispatch(projectsLoadSuccess(response.jsonData.results));
    } else {
      dispatch(projectsLoadFailure());
    }
  });
};
