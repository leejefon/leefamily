/*
 * Http
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/18
 * @rewroteAt: 2016/10/20
 */

import _ from 'lodash/core';
import * as qs from 'querystring';

class Http {
  static headers = {};

  static auth(token) {
    _.assignIn(this.headers, { Authorization: token });
    return this;
  }

  static header(headers) {
    _.assignIn(this.headers, headers);
    return this;
  }

  static get(url, params) {
    return fetch(this.url(url, params), {
      method: 'GET',
      headers: this.headers
    }).then((response) => {
      this.reset();
      if (response.ok && response.status === 200) {
        return response.text();
      }
      return null;
    }).then((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    });
  }

  static post(url, data, params) {
    let body = data;
    if (data instanceof FormData === false) {
      if (this.headers['Content-Type'] === 'application/json') {
        body = JSON.stringify(data);
      } else {
        body = qs.stringify(data);
      }
    }

    return fetch(this.url(url, params), {
      method: 'POST',
      headers: this.headers,
      body
    }).then((response) => {
      this.reset();
      if (response.ok && response.status === 200) {
        return response.text();
      }
      return null;
    }).then((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    });
  }

  static put(url, data, params) {
    return fetch(this.url(url, params), {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data)
    }).then((response) => {
      this.reset();
      if (response.ok && response.status === 200) {
        return response.text();
      }
      return null;
    }).then((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    });
  }

  static del(url, data, params) {
    return fetch(this.url(url, params), {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data)
    }).then((response) => {
      this.reset();
      if (response.ok && response.status === 200) {
        return response.text();
      }
      return null;
    }).then((text) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    });
  }

  static url(url, params) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${process.env.BASE_URL}/api${url}?${qs.stringify(params)}`;
  }

  static reset() {
    this.accessToken = '';
    this.headers = {};
  }
}

export default Http;
