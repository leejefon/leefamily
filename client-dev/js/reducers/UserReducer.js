/*
 * User Reducer
 *
 * @author: Jeff Lee
 * @createdAt: 2016/11/08
 */

import Immutable from 'immutable';
import * as Events from '../actions/ActionConstants';
import { initialState } from './UserStates';

function userReducer(state = initialState, action) {
  switch (action.type) {
    case Events.USER_SET_CURRENT: // NOTE: Current viewing user, not the same as current user in uiState
      return state.merge({
        currentUser: action.data
      });
    case Events.USER_PROJECT_SET_LIST:
      return state.merge({
        listProjects: action.concat ?
          state.get('listProjects').concat(Immutable.fromJS(action.data)) :
          action.data
      });
    case Events.USER_ORGANIZATION_SET_LIST:
      return state.merge({
        listOrganizations: action.concat ?
          state.get('listOrganizations').concat(Immutable.fromJS(action.data)) :
          action.data
      });
    case Events.USER_TRANSACTION_SET_LIST:
      return state.merge({
        listTransactions: action.data
      });
    case Events.USER_STRIPE_ACCOUNT_SET_LIST:
      return state.merge({
        listStripeAccounts: action.data
      });
    case Events.TRANSACTION_COMPLETE:
      return state.merge({
        transactionCompleted: action.data
      });
    default:
      return state;
  }
}

module.exports = userReducer;
