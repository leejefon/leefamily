/*
 * User Actions
 *
 * @author: Jeff Lee
 * @createdAt: 2016/10/11
 */

import _ from 'lodash/core';
import Immutable from 'immutable';
import * as Events from './ActionConstants';
import { sendingRequest, setFlashMessage } from './CommonActions';
import AmazonS3 from '../utils/AmazonS3';
import User from '../utils/User';

export function setCurrentUserData(currentUser) {
  return (dispatch) => {
    dispatch({
      type: Events.USER_SET_LOGGEDIN,
      currentUser: Immutable.fromJS(_.chain(currentUser)
        .pick(['id', 'name', 'email', 'avatar', 'bio', 'city', 'url', 'created', 'totalContributedAmount', 'totalContributedCount'])
        .assignIn({
          emailVerified: !currentUser.email_confirm_token
        })
        .value())
    });
  };
}

export function updateUser(data) {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    User.updateCurrentUser(data).then(() => {
      dispatch(sendingRequest(false));
      dispatch({
        type: Events.USER_UPDATE_INFO,
        data: _.pick(data, ['name', 'avatar', 'currentPassword', 'newPassword', 'bio', 'city', 'url'])
      });
      dispatch(setFlashMessage({
        type: 'success',
        message: 'Profile updated'
      }));
    });
  };
}

export function uploadAvatar(file) {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    AmazonS3.uploadAvatar(file).then((response) => {
      dispatch(sendingRequest(false));
      dispatch(updateUser({
        avatar: response.result.files.file[0].providerResponse.location
      }));
      dispatch(setFlashMessage({
        type: 'success',
        message: 'Profile updated'
      }));
    });
  };
}
