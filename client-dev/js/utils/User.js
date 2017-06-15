/*
 * User
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/25
 */

import cookie from 'react-cookie';
import Http from './Http';

module.exports = {
  getCurrentUser: () => Http
    .auth(cookie.load('token'))
    .get(`/users/${cookie.load('uid')}`),

  updateCurrentUser: data => Http
    .auth(cookie.load('token'))
    .header({ 'Content-Type': 'application/json' })
    .put(`/users/${cookie.load('uid')}`, data),

  resetPasswordRquest: email => Http
    .header({ 'Content-Type': 'application/json' })
    .post('/users/reset_password', { email }),

  resetPassword: (token, password) => Http
    .header({ 'Content-Type': 'application/json' })
    .post(`/users/reset_password/${token}`, { password }),

  confirmEmail: token => Http
    .get('/users/confirm_email', { token }),

  resendConfirmationEmail: () => Http
    .auth(cookie.load('token'))
    .post('/users/resend_confirmation_email'),

  checkToken: (type, token) => Http
    .header({ 'Content-Type': 'application/json' })
    .post('/users/check_token', { type, token })
};
