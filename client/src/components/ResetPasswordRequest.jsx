import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { I18n } from 'react-i18next';
import classnames from 'classnames';
import client from '../utils/feathers';
import styles from '../css/defaultLayout.scss';

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

  submit() {
    const { email } = this.state;

    // return client.service('users')
    //   .create({ email, password })
    //   .then(() => this.login());
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <Form className={classnames(styles.formWrapper, 'p-1')}>
            <h2 className={classnames('text-center', 'text-primary', 'mb-3')}>Reset Password</h2>

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

            <div className="text-center">
              <Button color="primary" size="lg" outline onClick={() => this.submit()}>Send Email</Button>
            </div>
          </Form>
        )}
      </I18n>
    );
  }
}

export default ResetPasswordRequest;
