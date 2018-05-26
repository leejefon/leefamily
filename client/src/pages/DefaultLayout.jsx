/**
 * DefaultLayout
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { I18n } from 'react-i18next';
import Header from '../components/Header';
import Toastr from '../components/Toastr';
import Loading from '../components/Loading';
import Login from '../components/Login';
import ResetPassword from '../components/ResetPassword';
import ResetPasswordRequest from '../components/ResetPasswordRequest';

import styles from '../css/defaultLayout.scss';

class DefaultLayout extends Component {
  render() {
    const body = this.props.loading ? (
      <Loading />
    ) : (
      <I18n ns="translations">
        {t => (
          <>
            <Route path="/" exact component={Login} />
            <Route path="/resetPassword" exact component={ResetPasswordRequest} />
            <Route path="/resetPassword/:token" exact component={ResetPassword} />
          </>
        )}
      </I18n>
    );

    return (
      <>
        <Header fixedTop />
        <Toastr />
        <div className={styles.main}>{body}</div>
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
