import Immutable from 'immutable';
import * as Actions from '../actions';

const initialState = Immutable.fromJS({
  showUserModal: false,
  userModalAction: '',
  selectedUser: null,

  alertType: null,
  alertMsg: null
});

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.TOGGLE_USER_MODAL:
      return state.merge({
        showUserModal: action.data.show,
        userModalAction: action.data.action,
        selectedUser: action.data.data
      });
    case Actions.SET_ALERT:
      return state.merge({
        alertType: action.data.type,
        alertMsg: action.data.message
      });
    default:
      return state;
  }
}

export default uiReducer;