import React from 'react';
import Route from 'react-router/lib/Route';

import App from './pages/App';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login';
// import ResetPassword from './components/pages/ResetPassword';
// import ConfirmEmail from './components/pages/ConfirmEmail';

import NotFound from './pages/NotFound';

import client from './utils/feathers';

function checkAuth(nextState, replaceState) {
  if (!localStorage['feathers-jwt']) { // HACK: need to find a better way to do this
    replaceState('/login');
  }
}

const appRoutes = (
  <Route component={App}>
    <Route path="/login" component={Login} />

    <Route onEnter={checkAuth}>
      <Route path="/" component={Dashboard} />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);

export default appRoutes;

// <Route path="/reset_password" component={ResetPassword} />
// <Route path="/confirm_email" component={ConfirmEmail} />
