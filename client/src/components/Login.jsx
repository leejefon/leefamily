/**
 * Login
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

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  updateField(name, value) {
    this.setState({ [name]: value });
  }

  login(e) {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      this.props.dispatch({
        type: Actions.SET_ALERT,
        data: {
          type: 'danger',
          message: 'All fields are required'
        }
      });
      return;
    }

    client.authenticate({
      strategy: 'local',
      email: this.state.email,
      password: this.state.password
    }).catch(() => {
      this.props.dispatch({
        type: Actions.SET_ALERT,
        data: {
          type: 'danger',
          message: 'Invalid email/password'
        }
      });
    });
  }

  // signup() {
  //   const { email, password } = this.state;
  //
  //   return client.service('users')
  //     .create({ email, password })
  //     .then(() => this.login());
  // }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <Form className="p-1 w-100 m-auto" style={{ maxWidth: 420 }}>
            <h2 className={classnames('text-center', 'text-primary', 'mb-3')}>Login</h2>

            <FormGroup className="form-float-label-group">
              <Input
                autoFocus
                type="email"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.updateField('email', e.target.value)}
              />
              <Label for="email"><i className="fa fa-envelope mr-2" />Email</Label>
            </FormGroup>
            <FormGroup className="form-float-label-group">
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.updateField('password', e.target.value)}
              />
              <Label for="password"><i className="fas fa-key mr-2" />Password</Label>
            </FormGroup>

            <div className="text-center">
              <Button
                outline
                color="primary"
                size="lg"
                type="submit"
                onClick={e => this.login(e)}
              >
                Login
              </Button>
              <Button
                className="d-block m-auto"
                color="link"
                onClick={() => this.props.history.push('/resetPassword')}
              >
                Reset Password
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

export default connect(mapStateToProps)(Login);
