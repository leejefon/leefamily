/**
 * App
 *
 * @author: Jeff Lee
 * @createdAt: 2017/06/14
 */

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};

export default App;
