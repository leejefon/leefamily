/**
 * Dashboard
 *
 * @author: Jeff Lee
 * @createdAt: 2017/12/06
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';
import {
  Button, Col, Row, FormGroup, Input, Label,
  Card, CardBody, CardImg, CardText, CardTitle
} from 'reactstrap';
import Header from '../components/Header';
import Toastr from '../components/Toastr';
import Footer from '../components/Footer';
import UserModal from '../components/UserModal';
import UserFormModal from '../components/UserFormModal';
import * as Actions from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.dispatch(Actions.fetchUsers());
  }

  updateField(name, value) {
    this.setState({ [name]: value });
  }

  openUserModal(data) {
    this.props.dispatch({
      type: Actions.TOGGLE_USER_MODAL,
      data: {
        show: true,
        data
      }
    });
  }

  openUserForm(action, data) {
    this.props.dispatch({
      type: Actions.TOGGLE_USER_FORM,
      data: {
        show: true,
        data, action
      }
    });
  }

  search(query) {
    this.props.dispatch(Actions.search(query));
  }

  render() {
    const users = this.props.data.filteredUsers.length > 0 ?
      this.props.data.filteredUsers : this.props.data.users;

    return (
      <>
        <Header />
        <Toastr />

        <I18n ns="translations">
          {t => (
            <div className="container">
              <div className="d-flex justify-content-between">
                <FormGroup className="form-float-label-group w-50">
                  <Input
                    type="text"
                    id="search"
                    placeholder="Search"
                    onChange={e => this.search(e.target.value)}
                  />
                  <Label for="search"><i className="fa fa-search mr-2" />Search</Label>
                </FormGroup>

                <Button
                  color="link"
                  onClick={() => this.openUserForm('ADD')}
                >
                  <i className="fa fa-plus mr-2" />Add User
                </Button>
              </div>

              <Row>
                {users.map(user => (
                  <Col lg="3" md="4" sm="6" key={user.id} className="mb-4">
                    <Card onClick={() => this.openUserModal(user)}>
                      <CardImg
                        top
                        height="200"
                        alt="Card image cap"
                        src={user.avatar || 'https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97200&w=250&h=200'}
                        style={{ objectFit: 'cover' }}
                      />
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
            </div>
          )}
        </I18n>

        <Footer />
        <UserFormModal />
        <UserModal />
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
