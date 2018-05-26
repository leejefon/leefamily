import client from '../utils/feathers';

export const TOGGLE_USER_MODAL = 'TOGGLE_USER_MODAL';
export const TOGGLE_USER_FORM = 'TOGGLE_USER_FORM';
export const SET_ALERT = 'SET_AERT';
export const SET_USERS = 'SET_USERS';
export const SET_FILTERED_USER = 'SET_FILTERED_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function fetchUsers() {
  return (dispatch) => {
    const User = client.service('users');

    User.find({
      query: {
        $limit: 100
      }
    }).then((users) => {
      dispatch({
        type: SET_USERS,
        data: users.data
      });
    });
  };
}

export function search(query) { // TODO: maybe use Fuse.js to search
  return (dispatch, getState) => {
    if (!query) {
      dispatch({
        type: SET_FILTERED_USER,
        data: []
      });
    } else {
      const users = getState().get('dataReducer').get('users').toJS();

      dispatch({
        type: SET_FILTERED_USER,
        data: users.filter(user => user.name.includes(query) || (user.email && user.email.includes(query)))
      });
    }
  };
}
