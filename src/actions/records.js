import * as api from '../api';

const types = {
  RECORDS_LOAD_REQUEST: 'RECORDS/RECORDS_LOAD_REQUEST',
  RECORDS_LOAD_SUCCESS: 'RECORDS/RECORDS_LOAD_SUCCESS',
  RECORDS_LOAD_FAILURE: 'RECORDS/RECORDS_LOAD_FAILURE',
  RECORD_SUBMIT_REQUEST: 'RECORDS/RECORD_SUBMIT_REQUEST',
  RECORD_SUBMIT_SUCCESS: 'RECORDS/RECORD_SUBMIT_SUCCESS',
  RECORD_SUBMIT_FAILURE: 'RECORDS/RECORD_SUBMIT_FAILURE',
  RECORD_REMOVE_REQUEST: 'RECORDS/RECORD_REMOVE_REQUEST',
  RECORD_REMOVE_SUCCESS: 'RECORDS/RECORD_REMOVE_SUCCESS',
  RECORD_REMOVE_FAILURE: 'RECORDS/RECORD_REMOVE_FAILURE',
  ADD: 'RECORDS/ADD',
  EDIT: 'RECORDS/EDIT',
  RESET: 'RECORD/RESET',
};
export default types;

const processRecord = (record) => ({
  project: record.project === null ? '' : record.project,
  time_spent: record.time_spent,
  issue: record.issue === null ? '' : record.issue,
  description: record.description,
  id: record.id,
});

export const recordsLoadSuccess = (records) => ({ type: types.RECORDS_LOAD_SUCCESS, records });
export const recordsLoadFailure = () => ({ type: types.RECORDS_LOAD_FAILURE });
export const recordsSubmitSuccess = (record, index) => ({ type: types.RECORD_SUBMIT_SUCCESS, record, index });
export const recordsSubmitFailure = (errors) => ({ type: types.RECORD_SUBMIT_FAILURE, errors });
export const recordsRemoveSuccess = (index) => ({ type: types.RECORD_REMOVE_SUCCESS, index });
export const recordsRemoveFailure = () => ({ type: types.RECORD_REMOVE_FAILURE });
export const addRecord = () => ({ type: types.ADD });
export const editRecord = (index, field, value) => ({ type: types.EDIT, index, field, value });
export const reset = () => ({ type: types.RESET });

export const recordsLoadRequest = (date) => (dispatch, getState) => {
  const userId = getState().auth.currentUser.id;
  dispatch({
    type: types.RECORDS_LOAD_REQUEST,
  });
  return api.getRecords(date, date, userId).then((response) => {
    if (response.ok) {
      dispatch(recordsLoadSuccess(response.jsonData.results.map(processRecord)));
    } else {
      dispatch(recordsLoadFailure());
    }
  });
};

export const recordSubmitRequest = (date, payload, index) => dispatch => {
  dispatch({
    type: types.RECORD_SUBMIT_REQUEST,
  });
  return api.addOrEditRecord(date, payload).then((response) => {
    if (response.ok) {
      dispatch(recordsSubmitSuccess(processRecord(response.jsonData), index));
    } else {
      dispatch(recordsSubmitFailure(response.jsonData));
    }
  });
};

export const recordRemoveRequest = (id, index) => dispatch => {
  dispatch({
    type: types.RECORD_REMOVE_REQUEST,
  });
  return api.removeRecord(id).then((response) => {
    if (response.ok) {
      dispatch(recordsRemoveSuccess(index));
    } else {
      dispatch(recordsRemoveFailure());
    }
  });
};
