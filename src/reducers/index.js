import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import records from './records';
import lines from './lines';

export default combineReducers({
  auth,
  projects,
  records,
  lines,
});
