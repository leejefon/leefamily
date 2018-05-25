import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { I18n } from 'react-i18next';
import * as Actions from '../actions';

class UserFormModal extends Component {
  constructor() {
    super();

    this.state = {
      data: {

      }
    };
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

  addUser() {
    console.log(this.state.data);
  }

  updateUser() {
    console.log(this.props.ui.selectedUser);
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
