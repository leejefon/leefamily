/**
 * UserFormModal
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dropzone from 'react-dropzone';
import { I18n } from 'react-i18next';
import client from '../utils/feathers';
import * as Actions from '../actions';

class UserFormModal extends Component {
  constructor() {
    super();

    this.state = {
      data: {

      }
    };
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
      console.log(data.id);
      // this.updateData('avatar', data.id);
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
            <Modal size="lg" isOpen={showUserForm} toggle={() => this.close()}>
              <ModalHeader toggle={() => this.close()}>{actionTitle}</ModalHeader>

              <ModalBody>
                <Dropzone onDrop={this.onDrop} multiple={false} accept="image/jpeg,image/png" />
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
