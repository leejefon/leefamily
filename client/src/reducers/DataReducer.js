import Immutable from 'immutable';
import * as Actions from '../actions';

const initialState = Immutable.fromJS({
  users: []
});

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USERS:
      return state.merge({
        users: action.data
      });
    case Actions.UPDATE_USER:
      return state;
    default:
      return state;
  }
}

export default dataReducer;