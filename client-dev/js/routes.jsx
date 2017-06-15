/*
 * Routes
 *
 * @author: Jeff Lee
 * @createdAt: 2017/06/15
 */

import React from 'react';
import Route from 'react-router/lib/Route';

import App from './components/App';
import Home from './components/pages/Home';

import Auth from './utils/Auth';

function checkAuth(nextState, replaceState) {
  if (!Auth.loggedIn()) {
    replaceState('/login');
  }
}

const appRoutes = (
  <Route component={App}>
    <Route path="/" component={Home} onEnter={checkAuth} />
    <Route path="/login" component={Home} />
  </Route>
);

export default appRoutes;
