import * as api from '../api';

const types = {
  RECORDS_LOAD_REQUEST: 'RECORDS/RECORDS_LOAD_REQUEST',
  RECORDS_LOAD_SUCCESS: 'RECORDS/RECORDS_LOAD_SUCCESS',
  RECORDS_LOAD_FAILURE: 'RECORDS/RECORDS_LOAD_FAILURE',
};
export default types;

export const recordsLoadSuccess = (records) => ({ type: types.RECORDS_LOAD_SUCCESS, records });
export const recordsLoadFailure = () => ({ type: types.RECORDS_LOAD_FAILURE });

export const recordsLoadRequest = (date) => (dispatch, getState) => {
  const userId = getState().auth.currentUser.id;
  dispatch({
    type: types.RECORDS_LOAD_REQUEST,
  });
  return api.getRecords(date, date, userId).then((response) => {
    if (response.ok) {
      dispatch(recordsLoadSuccess(response.jsonData.results));
    } else {
      dispatch(recordsLoadFailure());
    }
  });
};
