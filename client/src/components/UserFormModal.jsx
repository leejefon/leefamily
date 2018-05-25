import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { I18n } from 'react-i18next';
import * as Actions from '../actions';

class UserFormModal extends Component {
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
    console.log('add');
  }

  updateUser() {
    console.log(this.props.ui.selectedUser);
  }

  render() {
    const { showUserForm, selectedUser: user, userFormAction } = this.props.ui;

    const actionTitle = user ? user.name : '';
    const actionBtn = userFormAction === 'ADD' ? (
      <Button color="primary" onClick={() => this.addUser()}>Add User</Button>
    ) : (
      <Button color="primary" onClick={() => this.updateUser()}>Update</Button>
    );

    return (
      <I18n ns="translations">
        {t => (
          <Modal size="lg" isOpen={showUserForm} toggle={() => this.close()}>
            <ModalHeader toggle={() => this.close()}>{actionTitle}</ModalHeader>

            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>

            <ModalFooter>
              <Button color="secondary" className="mr-2" onClick={() => this.close()}>Cancel</Button>
              {actionBtn}
            </ModalFooter>
          </Modal>
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

export default connect(mapStateToProps)(UserFormModal);
