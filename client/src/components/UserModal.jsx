/**
 * UserModal
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { I18n } from 'react-i18next';
import classnames from 'classnames';
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
          <Modal isOpen={this.props.ui.showUserModal} toggle={() => this.close()} size="lg">
            <ModalHeader toggle={() => this.close()}>
              {user.name}
            </ModalHeader>

            <ModalBody>
              <Row>
                <Col md="5">
                  <img className="img-thumbnail rounded" src={user.avatar} alt="" />
                </Col>

                <Col md="7">
                  <Table borderless size="lg">
                    <tbody>
                      <tr className={classnames({ 'd-none': !user.email })}>
                        <th><i className="fa fa-envelope mr-2" />Email</th>
                        <td>{user.email}</td>
                      </tr>
                      <tr className={classnames({ 'd-none': !user.home_phone })}>
                        <th><i className="fa fa-phone mr-2" />Home</th>
                        <td>{user.home_phone}</td>
                      </tr>
                      <tr className={classnames({ 'd-none': !user.mobile_phone })}>
                        <th><i className="fa fa-mobile-alt mr-2" />Mobile</th>
                        <td>{user.mobile_phone}</td>
                      </tr>
                      <tr className={classnames({ 'd-none': !(user.address || user.city) })}>
                        <th><i className="fa fa-home mr-2" />Address</th>
                        <td>{user.city}{user.address}</td>
                      </tr>
                      <tr className={classnames({ 'd-none': !user.birthday })}>
                        <th><i className="fa fa-birthday-cake mr-2" />Birthday</th>
                        <td>
                          {new Date(user.birthday)
                            .toLocaleDateString('en-us', {
                              timeZone: 'Asia/Taipei' // As long as greater than UTC
                            })
                          }
                        </td>
                      </tr>
                      <tr className={classnames({ 'd-none': !(user.line || user.facebook) })}>
                        <th><i className="fa fa-comments mr-2" />Social Media</th>
                        <td>
                          <div className={classnames({ 'd-none': !user.line })}>
                            <i className="fab fa-line mr-2" />{user.line}
                          </div>
                          <a
                            className={classnames({ 'd-none': !user.facebook })}
                            href={`https://facebook.com/${user.facebook}`}
                            target="_blank"
                          >
                            <i className="fab fa-facebook mr-2" />{user.facebook}
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
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
