import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';
import {
  Row, Col, Button,
  Card, CardImg, CardText, CardBody, CardTitle
} from 'reactstrap';
import Header from '../components/Header';
import { fetchUsers } from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div className="container">
            <Header />
            <h1>{t('title')}</h1>
            <Row>
              {this.props.data.users.map(user => (
                <Col sm="3" key={user.id}>
                  <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{user.name}</CardTitle>
                      <CardText>
                        {user.email}
                      </CardText>
                      <Button>Update</Button>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </I18n>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.get('dataReducer').toJS(),
    uiState: state.get('uiReducer')
  };
}

export default connect(mapStateToProps)(Dashboard);
