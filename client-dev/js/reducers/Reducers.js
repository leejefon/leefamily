/*
 * Reducers
 *
 * @author: Jeff Lee
 * @createdAt: 2016/10/09
 */

import { combineReducers } from 'redux-immutable';
import uiReducer from './UIReducer';
import companyReducer from './CompanyReducer';
import projectReducer from './ProjectReducer';
import userReducer from './UserReducer';

export default combineReducers({
  uiReducer,
  companyReducer,
  projectReducer,
  userReducer
});
