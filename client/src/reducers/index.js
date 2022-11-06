import { combineReducers } from 'redux';

import employees from './employees';
import jobTitle from './jobTitle';
import auth from './auth';

export default combineReducers({ employees, auth, jobTitle });