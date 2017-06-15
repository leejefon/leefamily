/*
 * User Auth Actions
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/07
 */

import { sendingRequest, setFlashMessage } from './CommonActions';
import { setCurrentUserData } from './UserActions';
import * as Events from './ActionConstants';
import * as Utils from '../utils/utils';
import Auth from '../utils/Auth';
import User from '../utils/User';

export function toggleLoginModal(showLoginModal) {
  return { type: Events.TOGGLE_LOGIN_MODAL, showLoginModal };
}

export function toggleRegisterModal(showRegisterModal) {
  return { type: Events.TOGGLE_REGISTER_MODAL, showRegisterModal };
}

export function toggleResetPasswordModal(showResetPasswordModal) {
  return { type: Events.TOGGLE_RESET_PASSWORD_MODAL, showResetPasswordModal };
}

export function setEmailStatus(status) {
  return { type: Events.USER_SET_EMAIL_STATUS, status };
}

export function register(params) {
  const { name, email, password, facebookToken } = params;

  return (dispatch) => {
    dispatch(sendingRequest(true));

    if (!facebookToken && Utils.anyElementsEmpty({ name, email, password })) {
      dispatch(sendingRequest(false));
      dispatch(setFlashMessage({
        type: 'danger',
        message: 'All fields are required'
      }));
      return;
    }

    Auth.register(params).then((user) => {
      dispatch(sendingRequest(false));

      if (user) {
        Utils.forwardTo('/dashboard');
        dispatch(toggleRegisterModal(false));
        dispatch(setCurrentUserData(user));
      } else {
        dispatch(setFlashMessage({
          type: 'danger',
          message: 'E-mail invalid or already registered'
        }));
      }
    });
  };
}

export function login(email, password, type) {
  return (dispatch) => {
    dispatch(sendingRequest(true));

    if (type !== 'facebook' && Utils.anyElementsEmpty({ email, password })) {
      dispatch(sendingRequest(false));
      dispatch(setFlashMessage({
        type: 'danger',
        message: 'All fields are required'
      }));
      return;
    }

    Auth.login(email, password, type).then((user) => {
      dispatch(sendingRequest(false));

      if (user) {
        Utils.forwardTo('/dashboard');
        dispatch(toggleLoginModal(false));
        dispatch(setCurrentUserData(user));
      } else {
        dispatch(setFlashMessage({
          type: 'danger',
          message: 'Invalid email/password'
        }));
      }
    });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));

    Auth.logout().then((success) => {
      if (success === true) {
        dispatch(sendingRequest(false));
        Utils.forwardTo('/');
      } else {
        dispatch(setFlashMessage({
          type: 'danger',
          message: 'Unknown Error'
        }));
      }
    });
  };
}

export function resetPasswordRequest(email) {
  return (dispatch) => {
    dispatch(sendingRequest(true));

    User.resetPasswordRquest(email).then(() => {
      dispatch(sendingRequest(false));
      dispatch(toggleResetPasswordModal(false));
      dispatch(setFlashMessage({
        type: 'success',
        message: `We've sent a password reset link to email: ${email}`
      }));
    });
  };
}

export function resetPassword(token, password) {
  return (dispatch) => {
    dispatch(sendingRequest(true));

    User.resetPassword(token, password).then(() => {
      dispatch(sendingRequest(false));
      Utils.forwardTo('/');
      dispatch(toggleLoginModal(true));
      dispatch(setFlashMessage({
        type: 'success',
        message: 'Password updated'
      }));
    });
  };
}

export function confirmEmail(token) {
  return (dispatch) => {
    dispatch(sendingRequest(true));

    User.confirmEmail(token).then(() => {
      dispatch(sendingRequest(false));
      dispatch(setEmailStatus(true));
    });
  };
}
