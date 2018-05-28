/**
 * Footer
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

import React, { Component } from 'react';
import { I18n } from 'react-i18next';

class Footer extends Component {
  render() {
    return (
      <I18n ns="translations">
        {t => (
          <footer className="d-flex justify-content-between container mt-4 pt-2 pb-4 text-muted border-top">
            <small>&copy; 2018</small>
            <small>Created by <i>Jeff Lee</i></small>
          </footer>
        )}
      </I18n>
    );
  }
}

export default Footer;
