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
      newPassword: '',
      confirmPassword: ''
    };
  }

  componentDidMount() {
    const token = this.props.match.params.token;

    return client.service('api/resetPassword')
      .get(token)
      .then((data) => {
        if (!data || data.total === 0) {
          window.location.href = '/'; // invalid, need to show alert
        }
      });
  }

  updateField(name, value) {
    this.setState({ [name]: value });
  }

  submit() {
    const { newPassword: password } = this.state;
    const password_reset_key = this.props.match.params.token;

    return client.service('api/resetPassword')
      .patch({ password_reset_key }, { password })
      .then(() => window.location.href = '/');
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <Form className={classnames(styles.formWrapper, 'p-1')}>
            <h2 className={classnames('text-center', 'text-primary', 'mb-3')}>New Password</h2>

            <FormGroup className="form-float-label-group">
              <Input
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
              <Button color="primary" size="lg" outline onClick={() => this.submit()}>Update Password</Button>
            </div>
          </Form>
        )}
      </I18n>
    );
  }
}

export default ResetPasswordRequest;
