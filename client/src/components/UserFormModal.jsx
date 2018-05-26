/**
 * UserFormModal
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Row, Col, Form, FormGroup, Input, Label
} from 'reactstrap';
import Dropzone from 'react-dropzone';
import { I18n } from 'react-i18next';
import client from '../utils/feathers';
import * as Actions from '../actions';

class UserFormModal extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        name: '',
        email: '',
        city: '',
        address: '',
        home_phone: '',
        mobile_phone: '',
        birthday: '',
        line: '',
        facebook: ''
      }
    };
  }

  componentWillReceiveProps(props) {

  }

  addUser() {
    console.log(this.state.data);
  }

  updateUser() {
    console.log(this.props.ui.selectedUser);
  }

  updateData(name, value) {
    let names = name;
    let values = value;
    if (!Array.isArray(names) && !Array.isArray(values)) {
      names = [name];
      values = [value];
    }

    const data = Object.assign({}, this.state.data);
    for (let i = 0; i < names.length; i += 1) {
      data[names[i]] = values[i];
    }
    this.setState({ data });
  }

  onDrop(acceptedFiles) {
    const s3Upload = client.service('upload');
    const ext = acceptedFiles[0].type.split('/')[1];

    s3Upload.create({
      id: `avatars/${Math.random().toString(36).slice(2)}.${ext}`,
      buffer: acceptedFiles[0],
      contentType: acceptedFiles[0].type
    }).then((data) => {
      this.updateData('avatar', data.id);
    });
  }

  close() {
    this.props.dispatch({
      type: Actions.TOGGLE_USER_FORM,
      data: {
        show: false,
        data: null,
        action: null
      }
    });
  }

  render() {
    const { showUserForm, selectedUser: user, userFormAction } = this.props.ui;

    return (
      <I18n ns="translations">
        {(t) => {
          const actionTitle = user ? user.name : 'Add New User';
          const actionBtn = userFormAction === 'ADD' ? (
            <Button color="primary" onClick={() => this.addUser()}>Add User</Button>
          ) : (
            <Button color="primary" onClick={() => this.updateUser()}>Update</Button>
          );

          return (
            <Modal isOpen={showUserForm} toggle={() => this.close()} size="lg">
              <ModalHeader toggle={() => this.close()}>{actionTitle}</ModalHeader>

              <ModalBody>
                <Row>
                  <Col md={{ size: 4, offset: 1 }}>
                    <Dropzone
                      onDrop={() => this.onDrop()}
                      multiple={false}
                      accept="image/jpeg,image/png"
                    >
                      <p className="h-100 p-3 d-flex align-items-center text-center pointer">
                        Click or Drop photo here to upload
                      </p>
                    </Dropzone>
                  </Col>

                  <Col md="6">
                    <Form className="p-1">
                      <FormGroup className="form-float-label-group">
                        <Input
                          autoFocus
                          type="text"
                          id="name"
                          placeholder="Name"
                          value={this.state.name}
                          onChange={e => this.updateData('name', e.target.value)}
                        />
                        <Label for="name"><i className="fa fa-user mr-2" />Name</Label>
                      </FormGroup>

                      <FormGroup className="form-float-label-group">
                        <Input
                          autoFocus
                          type="email"
                          id="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={e => this.updateData('email', e.target.value)}
                        />
                        <Label for="email"><i className="fa fa-envelope mr-2" />Email</Label>
                      </FormGroup>

                      <FormGroup className="form-float-label-group">
                        <Input
                          autoFocus
                          type="text"
                          id="homePhone"
                          placeholder="Home Phone"
                          value={this.state.home_phone}
                          onChange={e => this.updateData('home_phone', e.target.value)}
                        />
                        <Label for="homePhone"><i className="fa fa-phone mr-2" />Home</Label>
                      </FormGroup>

                      <FormGroup className="form-float-label-group">
                        <Input
                          autoFocus
                          type="text"
                          id="mobilePhone"
                          placeholder="Mobile Phone"
                          value={this.state.mobile_phone}
                          onChange={e => this.updateData('mobile_phone', e.target.value)}
                        />
                        <Label for="mobilePhone"><i className="fa fa-mobile-alt mr-2" />Mobile</Label>
                      </FormGroup>

                      <Row>
                        <Col>
                          <FormGroup className="form-float-label-group">
                            <Input
                              autoFocus
                              type="text"
                              id="facebook"
                              placeholder="Facebook"
                              value={this.state.facebook}
                              onChange={e => this.updateData('facebook', e.target.value)}
                            />
                            <Label for="facebook"><i className="fab fa-facebook mr-2" />Facebook</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className="form-float-label-group">
                            <Input
                              autoFocus
                              type="text"
                              id="line"
                              placeholder="LINE"
                              value={this.state.line}
                              onChange={e => this.updateData('line', e.target.value)}
                            />
                            <Label for="line"><i className="fab fa-line mr-2" />LINE</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </ModalBody>

              <ModalFooter>
                <Button color="secondary" className="mr-2" onClick={() => this.close()}>Cancel</Button>
                {actionBtn}
              </ModalFooter>
            </Modal>
          );
        }}
      </I18n>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(UserFormModal);
