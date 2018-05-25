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
