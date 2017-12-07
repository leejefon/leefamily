import Immutable from 'immutable';
import * as Events from '../actions';

const initialState = Immutable.fromJS({
  showUserModal: false,
  userModalAction: '',
  selectedUser: null
});

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case Events.TOGGLE_USER_MODAL:
      return state.merge({
        showUserModal: action.data.show,
        userModalAction: action.data.action,
        selectedUser: action.data.data
      });
    default:
      return state;
  }
}

export default uiReducer;
