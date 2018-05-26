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
          <footer className="d-flex justify-content-between container mt-4 pt-3 pb-4 text-muted border-top">
            <div>&copy; 2018</div>
            <div>Created by <i>Jeff Lee</i></div>
          </footer>
        )}
      </I18n>
    );
  }
}

export default Footer;
