import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import client from '../utils/feathers';

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

  render() {
    return (
      <div className="container">
        <h1>Login</h1>

        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.updateField('email', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.updateField('password', e.target.value)}
            />
          </FormGroup>

          <Button color="primary" onClick={() => this.login()}>Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
