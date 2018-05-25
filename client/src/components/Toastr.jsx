import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import * as Actions from '../actions';

class Toastr extends Component {
  componentWillReceiveProps(props) {
    if (props.ui.alertMsg) {
      setTimeout(() => {
        this.onDismiss();
      }, 3000);
    }
  }

  onDismiss() {
    this.props.dispatch({
      type: Actions.SET_ALERT,
      data: {
        type: null,
        message: null
      }
    });
  }

  render() {
    const { alertType, alertMsg } = this.props.ui;
    return (
      <Alert
        isOpen={!!alertMsg}
        color={alertType || 'info'}
        className="float-right mb-3 mr-3 position-absolute shadow"
        style={{ width: '20%', bottom: 0, right: 0 }}
        toggle={() => this.onDismiss()}
      >
        {alertMsg}
      </Alert>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.get('uiReducer').toJS()
  };
}

export default connect(mapStateToProps)(Toastr);
