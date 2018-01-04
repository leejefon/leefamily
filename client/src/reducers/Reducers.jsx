import { combineReducers } from 'redux-immutable';
import dataReducer from './DataReducer';
import uiReducer from './UiReducer';

export default combineReducers({
  dataReducer,
  uiReducer
});
