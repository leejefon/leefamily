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
import Login from './components/pages/Login';
import ContactForm from './components/pages/ContactForm';
import Contact from './components/pages/Contact';

import Auth from './utils/Auth';

function checkAuth(nextState, replaceState) {
  if (!Auth.loggedIn()) {
    replaceState('/login');
  }
}

const appRoutes = (
  <Route component={App}>
    <Route path="/" component={Home} onEnter={checkAuth} />
    <Route path="/login" component={Login} />
    <Route path="/c/new" component={ContactForm} />
    <Route path="/c/:name" component={Contact} />
    <Route path="/c/:name/edit" component={ContactForm} />
  </Route>
);

export default appRoutes;
