import { combineReducers } from 'redux';

import employees from './employees';
import auth from './auth';

export default combineReducers({ employees, auth });