/**
 * ResetPasswordRequest
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
import * as Actions from '../actions';

class ResetPasswordRequest extends Component {
  constructor() {
    super();

    this.state = {
      email: ''
    };
  }

  updateField(name, value) {
    this.setState({ [name]: value });
  }

  submit(e) {
    e.preventDefault();

    const { email } = this.state;

    client.service('api/resetPassword')
      .create({ email })
      .then((response) => {
        if (response.length === 0) {
          this.props.dispatch({
            type: Actions.SET_ALERT,
            data: {
              type: 'danger',
              message: 'No email found'
            }
          });
          return;
        }

        this.props.dispatch({
          type: Actions.SET_ALERT,
          data: {
            type: 'success',
            message: 'Email sent'
          }
        });
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <Form className="p-1 w-100 m-auto" style={{ maxWidth: 420 }}>
            <h2 className={classnames('text-center', 'text-primary', 'mb-3')}>Reset Password</h2>

            <FormGroup className="form-float-label-group">
              <Input
                autoFocus
                type="email"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.updateField('email', e.target.value)}
              />
              <Label for="email">Email</Label>
            </FormGroup>

            <div className="text-center">
              <Button
                outline
                color="primary"
                size="lg"
                type="submit"
                onClick={e => this.submit(e)}
              >
                Send Email
              </Button>
              <Button
                className="d-block m-auto"
                color="link"
                onClick={() => this.props.history.push('/')}
              >
                Back to Login
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

export default connect(mapStateToProps)(ResetPasswordRequest);
