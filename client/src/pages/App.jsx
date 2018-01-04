import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import client from '../utils/feathers';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    client.authenticate().catch(() => {
      this.setState({ loggedIn: false });
    });

    client.on('authenticated', () => {
      this.setState({ loggedIn: true });
    });
  }

  render() {
    const children = this.state.loggedIn ? (<Dashboard />) : (<Login />);

    return (
      <div className="app">
        {children}
      </div>
    );
  }
}

export default App;
