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

    this.emptyData = {
      id: '',
      name: '',
      email: '',
      city: '',
      address: '',
      home_phone: '',
      mobile_phone: '',
      birthday: '',
      line: '',
      facebook: ''
    };

    this.state = {
      data: Object.assign({}, this.emptyData)
    };
  }

  componentWillReceiveProps(props) {
    if (props.ui.userFormAction === 'UPDATE' && props.ui.selectedUser.name) {
      const { selectedUser: user } = props.ui;

      const names = [];
      const values = [];
      Object.keys(this.state.data).forEach((field) => {
        names.push(field);
        values.push(user[field] || '');
      });
      this.updateData(names, values);
    }
  }

  onDrop(acceptedFiles) {
    const S3Upload = client.service('upload');
    const ext = acceptedFiles[0].type.split('/')[1];

    S3Upload.create({
      id: `avatars/${Math.random().toString(36).slice(2)}.${ext}`,
      buffer: acceptedFiles[0],
      contentType: acceptedFiles[0].type
    }).then((data) => {
      this.updateData('avatar', `https://s3-us-west-2.amazonaws.com/leefamily.tw/avatars/${data.id}`);
    });
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

  close() {
    this.props.dispatch({
      type: Actions.TOGGLE_USER_FORM,
      data: {
        show: false,
        data: null,
        action: null
      }
    });

    this.setState({ data: Object.assign({}, this.emptyData) });
  }

  addUser() {
    const User = client.service('users');

    // TODO: Validate data
    User.create(this.state.data).then(() => {
      this.close();
      // this.dispatch({
      //
      // });
    });
  }

  updateUser() {
    const User = client.service('users');

    // TODO: Validate data
    User
      .patch(this.state.data.id, this.state.data)
      .then(() => {
        this.close();
        // this.dispatch({
        //
        // });
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
                      {user && !user.avatar.includes('default') ? (
                        <img src={user.avatar} alt="" className="img-thumbnail rounded pointer" />
                      ) : (
                        <p className="h-100 p-3 d-flex align-items-center text-center pointer">
                          Click or Drop photo here to upload
                        </p>
                      )}
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
                          value={this.state.data.name}
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
                          value={this.state.data.email}
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
                          value={this.state.data.home_phone}
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
                          value={this.state.data.mobile_phone}
                          onChange={e => this.updateData('mobile_phone', e.target.value)}
                        />
                        <Label for="mobilePhone"><i className="fa fa-mobile-alt mr-2" />Mobile</Label>
                      </FormGroup>

                      <Row>
                        <Col md="5">
                          <FormGroup className="form-float-label-group">
                            <Input
                              autoFocus
                              type="text"
                              id="city"
                              placeholder="City"
                              value={this.state.data.city}
                              onChange={e => this.updateData('city', e.target.value)}
                            />
                            <Label for="city"><i className="fa fa-location-arrow mr-2" />City</Label>
                          </FormGroup>
                        </Col>
                        <Col md="7">
                          <FormGroup className="form-float-label-group">
                            <Input
                              autoFocus
                              type="text"
                              id="addr"
                              placeholder="Address"
                              value={this.state.data.address}
                              onChange={e => this.updateData('address', e.target.value)}
                            />
                            <Label for="addr"><i className="fa fa-map-marker mr-2" />Address</Label>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup className="form-float-label-group">
                            <Input
                              autoFocus
                              type="text"
                              id="facebook"
                              placeholder="Facebook"
                              value={this.state.data.facebook}
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
                              value={this.state.data.line}
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
