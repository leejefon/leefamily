/**
 * DefaultLayout
 *
 * @author: Jeff Lee
 * @createdAt: 2017/12/06
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { I18n } from 'react-i18next';
import classnames from 'classnames';
import Header from '../components/Header';
import Toastr from '../components/Toastr';
import Login from '../components/Login';
import ResetPassword from '../components/ResetPassword';
import ResetPasswordRequest from '../components/ResetPasswordRequest';
import client from '../utils/feathers';
import styles from '../css/defaultLayout.scss';

class DefaultLayout extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <>
        <Header fixedTop />
        <Toastr />

        <I18n ns="translations">
          {t => (
            <div className={styles.main}>
              <Route path="/" exact component={Login} />
              <Route path="/resetPassword" exact component={ResetPasswordRequest} />
              <Route path="/resetPassword/:token" exact component={ResetPassword} />
            </div>
          )}
        </I18n>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.get('uiReducer').toJS()
  };
}

export default withRouter(connect(mapStateToProps)(DefaultLayout));
