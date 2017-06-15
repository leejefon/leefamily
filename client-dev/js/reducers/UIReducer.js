/*
 * UIReducer
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/07
 */

import * as Events from '../actions/ActionConstants';
import { initialState } from './UIStates';

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case Events.SENDING_REQUEST:
      return state.merge({
        currentlySending: action.sending
      });
    case Events.SET_FLASH_MESSAGE:
    case Events.RESET_FLASH_MESSAGE:
      return state.merge({
        flashMessage: action.flashMessage
      });
    case Events.SET_CURRENT_VIEWING_OBJECT:
      return state.merge({
        currentViewingObject: action.data
      });
    case Events.TOGGLE_LOGIN_MODAL:
      return state.merge({
        showLoginModal: action.showLoginModal
      });
    case Events.TOGGLE_REGISTER_MODAL:
      return state.merge({
        showRegisterModal: action.showRegisterModal
      });
    case Events.TOGGLE_RESET_PASSWORD_MODAL:
      return state.merge({
        showResetPasswordModal: action.showResetPasswordModal
      });
    case Events.TOGGLE_ADD_PROJECT_MODAL:
      return state.merge({
        showAddProjectModal: action.show
      });
    case Events.TOGGLE_ADD_ORGANIZATION_MODAL:
      return state.merge({
        showAddOrganizationModal: action.show
      });
    case Events.TOGGLE_DELETE_PROJECT_MODAL:
      return state.merge({
        showDeleteProjectModal: action.show,
        projectToDelete: action.id
      });
    case Events.TOGGLE_CHECKOUT_MODAL:
      return state.merge({
        showCheckoutModal: action.showCheckoutModal
      });
    case Events.TOGGLE_DELETE_ORGANIZATION_MODAL:
      return state.merge({
        showDeleteOrganizationModal: action.show,
        organizationToDelete: action.id
      });

    case Events.USER_SET_LOGGEDIN: // NOTE: Current logged in user, not the same as current user in userState
      return state.merge({
        currentUser: action.currentUser
      });
    case Events.USER_SET_EMAIL_STATUS:
      return state.merge({
        currentUser: {
          emailVerified: action.status === 'verified'
        }
      });
    case Events.USER_UPDATE_INFO:
      return state.merge({
        currentUser: state.get('currentUser').merge(action.data)
      });
    case Events.COMING_SOON_SIGNED_UP:
      return state.merge({
        comingSoonSignUpSuccess: true
      });
    case Events.SUGGESTION_BOX:
      return state.merge({
        suggestionBoxSuccess: true
      });
    default:
      return state;
  }
}

module.exports = uiReducer;
