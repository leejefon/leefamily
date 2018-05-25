import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';
import classnames from 'classnames';
import {
  Button, Col, Row,
  Card, CardBody, CardImg, CardText, CardTitle
} from 'reactstrap';
import Header from '../components/Header';
import Toastr from '../components/Toastr';
import UserModal from '../components/UserModal';
import UserFormModal from '../components/UserFormModal';
import * as Actions from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.dispatch(Actions.fetchUsers());
  }

  openUserModal(data) {
    this.props.dispatch({
      type: Actions.TOGGLE_USER_MODAL,
      data: {
        show: true,
        data
      }
    })
  }

  openUserForm(action, data) {
    this.props.dispatch({
      type: Actions.TOGGLE_USER_FORM,
      data: {
        show: true,
        data, action
      }
    })
  }

  render() {
    return (
      <>
        <Header />
        <Toastr />

        <I18n ns="translations">
          {t => (
            <div className="container">
              <Row>
                {this.props.data.users.map(user => (
                  <Col sm="3" key={user.id} className="mb-4">
                    <Card onClick={() => this.openUserModal(user)}>
                      <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>{user.name}</CardTitle>
                        <CardText>
                          {user.email || (<br />)}
                        </CardText>
                        <Button
                          className="float-right"
                          color="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.openUserForm('UPDATE', user);
                          }}
                        >
                          Update
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <UserFormModal />
              <UserModal />
            </div>
          )}
        </I18n>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.get('dataReducer').toJS()
  };
}

export default connect(mapStateToProps)(Dashboard);
