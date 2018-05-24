import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import client from '../utils/feathers';

import styles from '../css/login.scss';
import '../css/custom.css';

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

  login() {
    client.authenticate({
      strategy: 'local',
      email: this.state.email,
      password: this.state.password
    }).catch(() => {});
  }

  signup() {
    const { email, password } = this.state;

    return client.service('users')
      .create({ email, password })
      .then(() => this.login());
  }

  render() {
    return (
      <div className={styles.login}>
        <Form className={classnames(styles.formWrapper, 'p-1')}>
          <h2 className={classnames('text-center', 'text-info', 'mb-4')}>Lee Family Contact</h2>

          <FormGroup className="form-float-label-group">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.updateField('email', e.target.value)}
            />
            <Label for="email">Email</Label>
          </FormGroup>
          <FormGroup className="form-float-label-group">
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.updateField('password', e.target.value)}
            />
            <Label for="password">Password</Label>
          </FormGroup>

          <div className="text-center">
            <Button color="info" size="lg" outline onClick={() => this.login()}>Login</Button>
            <Button color="info" size="lg" outline onClick={() => this.signup()}>Sign Up</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
