/**
 * App
 *
 * @author: Jeff Lee
 * @createdAt: 2017/12/06
 */

import React, { Component } from 'react';
import Dashboard from './Dashboard';
import DefaultLayout from './DefaultLayout';
import client from '../utils/feathers';

import '../css/global.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: null
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
    if (this.state.loggedIn === null) {
      return (<DefaultLayout loading />);
    }

    return this.state.loggedIn ? (<Dashboard />) : (<DefaultLayout />);
  }
}

export default App;
