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
import { fetchUsers } from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.dispatch(fetchUsers());
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
                    <Card>
                      <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>{user.name}</CardTitle>
                        <CardText>
                          {user.email || (<br />)}
                        </CardText>
                        <Button color="primary" size="sm">Update</Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
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
