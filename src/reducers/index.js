import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import records from './records';

export default combineReducers({
  auth,
  projects,
  records,
});
