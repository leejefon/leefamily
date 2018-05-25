/**
 * Reducers
 *
 * @author: Jeff Lee
 * @createdAt: 2017/12/06
 */

import { combineReducers } from 'redux-immutable';
import dataReducer from './DataReducer';
import uiReducer from './UiReducer';

export default combineReducers({
  dataReducer,
  uiReducer
});
