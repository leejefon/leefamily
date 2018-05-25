/**
 * ResetPassword
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { I18n } from 'react-i18next';
import classnames from 'classnames';
import client from '../utils/feathers';
import styles from '../css/defaultLayout.scss';
import * as Actions from '../actions';

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      newPassword: '',
      confirmPassword: ''
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;

    return client.service('api/resetPassword')
      .get(token)
      .then((data) => {
        if (!data || data.total === 0) {
          this.props.dispatch({
            type: Actions.SET_ALERT,
            data: {
              type: 'danger',
              message: 'Invalid token'
            }
          });
          this.props.history.push('/'); // invalid, need to show alert
        }
      });
  }

  updateField(name, value) {
    this.setState({ [name]: value });
  }

  submit(e) {
    e.preventDefault();

    const { newPassword: password, confirmPassword } = this.state;
    const password_reset_key = this.props.match.params.token;

    if (password !== confirmPassword) {
      this.props.dispatch({
        type: Actions.SET_ALERT,
        data: {
          type: 'danger',
          message: 'Passwords do not match'
        }
      });
      return;
    }

    client.service('api/resetPassword')
      .patch({ password_reset_key }, { password })
      .then(() => {
        this.props.dispatch({
          type: Actions.SET_ALERT,
          data: {
            type: 'success',
            message: 'Password updated'
          }
        });
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <Form className={classnames(styles.formWrapper, 'p-1')}>
            <h2 className={classnames('text-center', 'text-primary', 'mb-3')}>New Password</h2>

            <FormGroup className="form-float-label-group">
              <Input
                autoFocus
                type="password"
                id="newPassword"
                placeholder="New Password"
                value={this.state.newPassword}
                onChange={e => this.updateField('newPassword', e.target.value)}
              />
              <Label for="newPassword">New Password</Label>
            </FormGroup>

            <FormGroup className="form-float-label-group">
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={e => this.updateField('confirmPassword', e.target.value)}
              />
              <Label for="confirmPassword">Confirm Password</Label>
            </FormGroup>

            <div className="text-center">
              <Button
                outline
                color="primary"
                size="lg"
                type="submit"
                onClick={e => this.submit(e)}
              >
                Update Password
              </Button>
            </div>
          </Form>
        )}
      </I18n>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(ResetPassword);
