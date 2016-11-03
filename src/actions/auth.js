import * as api from '../api';

const types = {
  AUTO_LOGIN: 'AUTH/AUTO_LOGIN',
  SIGNUP_REQUEST: 'AUTH/SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'AUTH/SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'AUTH/SIGNUP_FAILURE',
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOGOUT_REQUEST: 'AUTH/LOGOUT_REQUEST',
  LOGOUT: 'AUTH/LOGOUT',
};
export default types;


export const loginSuccess = () => ({ type: types.LOGIN_SUCCESS });
export const loginFailure = () => ({ type: types.LOGIN_FAILURE });
export const logout = () => ({ type: types.LOGOUT });

export const loginRequest = (username, password) => dispatch => {
  dispatch({
    type: types.LOGIN_REQUEST,
  });
  return api.login(username, password).then((response) => {
    if (response.ok) {
      dispatch({
        type: types.LOGIN_SUCCESS,
        currentUser: response.jsonData,
      });
    } else {
      dispatch({
        type: types.LOGIN_FAILURE,
        errors: response.jsonData,
      });
    }
  });
};

export const autoLogin = () => dispatch => {
  dispatch({
    type: types.AUTO_LOGIN,
  });
  return api.getCurrentUser().then((response) => {
    if (response.ok) {
      dispatch({
        type: types.LOGIN_SUCCESS,
        currentUser: response.jsonData,
      });
    } else {
      dispatch({
        type: types.LOGIN_FAILURE,
        errors: [],
      });
    }
  });
};


export const logoutRequest = (username, password) => dispatch => {
  dispatch({
    type: types.LOGOUT_REQUEST,
  });
  return api.logout().then(() => {
    dispatch({
      type: types.LOGOUT,
    });
  });
};
