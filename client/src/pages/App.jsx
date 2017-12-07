import React, { Component } from 'react';
// import client from '../utils/feathers';

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
