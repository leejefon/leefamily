/*
 * Auth
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/18
 */

import cookie from 'react-cookie';
import Http from './Http';

function getCookieExpires(ttl) {
  return new Date(new Date().getTime() + (ttl * 1000));
}

const Auth = {
  register(params) {
    const { email, password, facebookToken } = params;

    return Http
      .header({ 'Content-Type': 'application/json' })
      .post('/users', params).then((user) => {
        if (facebookToken) {
          return this.login(user.email, facebookToken, 'facebook');
        }
        return this.login(email, password);
      });
  },

  login(email, password, type) {
    if (this.loggedIn()) {
      return Promise.resolve(true);
    }

    const credentials = { email, password };
    if (type === 'facebook') {
      delete credentials.password;
      credentials.facebookToken = password;
    }

    return Http
      .header({ 'Content-Type': 'application/json' })
      .post('/users/login', credentials, { include: 'user' })
      .then((token) => {
        if (token) {
          cookie.save('token', token.id, { expires: getCookieExpires(token.ttl) });
          cookie.save('uid', token.userId, { expires: getCookieExpires(token.ttl) });
          return token.user;
        }
        return false;
      });
  },

  logout() {
    return Http
      .auth(cookie.load('token'))
      .header({ 'Content-Type': 'application/json' })
      .post('/users/logout')
      .then(() => {
        cookie.remove('token');
        cookie.remove('uid');
        return true;
      });
  },

  loggedIn() {
    return !!cookie.load('token');
  },

  resumeLogin() {
    if (cookie.load('token') && cookie.load('uid')) {
      return Http
        .auth(cookie.load('token'))
        .header({ 'Content-Type': 'application/json' })
        .get(`/users/${cookie.load('uid')}`);
    }
    return Promise.resolve(false);
  }
};

module.exports = Auth;
