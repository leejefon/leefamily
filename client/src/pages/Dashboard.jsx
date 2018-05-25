import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-i18next';
import classnames from 'classnames';
import {
  Alert, Button, Col, Row,
  Card, CardBody, CardImg, CardText, CardTitle
} from 'reactstrap';
import Header from '../components/Header';
import { fetchUsers } from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    const { alertType, alertMsg } = this.props.ui;
    const alertBox = alertMsg ? (
      <Alert
        color={alertType || 'info'}
        className="float-right mb-3 mr-3 position-absolute shadow"
        style={{ width: '20%', bottom: 0, right: 0 }}
      >
        {alertMsg}
      </Alert>
    ) : null;

    return (
      <>
        <Header />
        {alertBox}

        <I18n ns="translations">
          {t => (
            <div className="container">
              <h2 className={classnames('text-center', 'text-primary', 'p-4')}>{t('title')}</h2>
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
    data: state.get('dataReducer').toJS(),
    ui: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(Dashboard);
