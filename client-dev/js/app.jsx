/**
 * app
 *
 * @author: Jeff Lee
 * @createdAt: 2017/06/15
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/Reducers';
import routes from './routes';
import * as Constants from './utils/Constants';

import '../css/main.scss';

const store = createStore(reducers, applyMiddleware(thunk));

ReactGA.initialize(Constants.googleAnalyticsId);
function logPageView() {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
}

ReactDOM.render(
  <IntlProvider locale="en">
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
    </Provider>
  </IntlProvider>,
  document.getElementById('app')
);
