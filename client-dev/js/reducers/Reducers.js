/*
 * Reducers
 *
 * @author: Jeff Lee
 * @createdAt: 2017/06/14
 */

import { combineReducers } from 'redux-immutable';
import uiReducer from './UIReducer';
import userReducer from './UserReducer';

export default combineReducers({
  uiReducer,
  userReducer
});
