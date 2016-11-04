import * as api from '../api';

const types = {
  RECORDS_LOAD_REQUEST: 'RECORDS/RECORDS_LOAD_REQUEST',
  RECORDS_LOAD_SUCCESS: 'RECORDS/RECORDS_LOAD_SUCCESS',
  RECORDS_LOAD_FAILURE: 'RECORDS/RECORDS_LOAD_FAILURE',
  RECORD_SUBMIT_REQUEST: 'RECORDS/RECORD_SUBMIT_REQUEST',
  RECORD_SUBMIT_SUCCESS: 'RECORDS/RECORD_SUBMIT_SUCCESS',
  RECORD_SUBMIT_FAILURE: 'RECORDS/RECORD_SUBMIT_FAILURE',
};
export default types;

export const recordsLoadSuccess = (records) => ({ type: types.RECORDS_LOAD_SUCCESS, records });
export const recordsLoadFailure = () => ({ type: types.RECORDS_LOAD_FAILURE });

export const recordsSubmitSuccess = (record) => ({ type: types.RECORD_SUBMIT_SUCCESS, record });
export const recordsSubmitFailure = (errors) => ({ type: types.RECORD_SUBMIT_FAILURE, errors });

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

export const recordSubmitRequest = (date, payload) => (dispatch, getState) => {
  dispatch({
    type: types.RECORD_SUBMIT_REQUEST,
  });
  return api.addRecord(date, payload).then((response) => {
    if (response.ok) {
      dispatch(recordsSubmitSuccess(response.jsonData));
    } else {
      dispatch(recordsSubmitFailure(response.jsonData));
    }
  });
};
