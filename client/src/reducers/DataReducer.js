import Immutable from 'immutable';
import * as Events from '../actions';

const initialState = Immutable.fromJS({
  users: []
});

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case Events.SET_USERS:
      return state.merge({
        users: action.data
      });
    case Events.UPDATE_USER:
      return state;
    default:
      return state;
  }
}

export default dataReducer;
