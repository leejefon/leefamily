import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uiState: state.get('uiReducer')
  };
}

export default connect(mapStateToProps)(Dashboard);
