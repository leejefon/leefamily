/**
 * App
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/17
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentUserData } from '../actions/UserActions';
import Auth from '../utils/Auth';

class App extends Component {
  componentDidMount() {
    // NOTE: gives 400 ms for css to render
    setTimeout(() => {
      document.getElementById('ld').style.display = 'none';
      document.getElementById('app').style.visibility = 'visible';
    }, 400);

    Auth.resumeLogin().then((user) => {
      if (user) {
        this.props.dispatch(setCurrentUserData(user));
      }
    });
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func,
  children: React.PropTypes.element
};

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(App);
