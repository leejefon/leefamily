import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { I18n } from 'react-i18next';
import * as Actions from '../actions';

class UserModal extends Component {
  close() {
    this.props.dispatch({
      type: Actions.TOGGLE_USER_MODAL,
      data: {
        show: false,
        data: null
      }
    });
  }

  render() {
    const { selectedUser: user } = this.props.ui;

    if (!user) return null;

    return (
      <I18n ns="translations">
        {t => (
          <Modal isOpen={this.props.ui.showUserModal} toggle={() => this.close()}>
            <ModalHeader toggle={() => this.close()}>
              {user.name}
            </ModalHeader>

            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
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

export default connect(mapStateToProps)(UserModal);
