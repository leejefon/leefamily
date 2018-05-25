import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { I18n } from 'react-i18next';
import classnames from 'classnames';
import Header from '../components/Header';
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

export default DefaultLayout;
