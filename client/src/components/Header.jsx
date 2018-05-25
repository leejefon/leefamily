/**
 * Header
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { I18n } from 'react-i18next';
import classnames from 'classnames';
import { toggleLanguage } from '../utils/i18n';

class Header extends Component {
  render() {
    const fixedTop = {
      'fixed-top': this.props.fixedTop
    };

    return (
      <I18n ns="translations">
        {t => (
          <Navbar light className={classnames('container', 'mb-4', fixedTop)}>
            <NavbarBrand href="/" className="mr-auto text-primary">
              <i className="fa fa-home mr-2" />
              {t('title')}
            </NavbarBrand>
            <Nav pills className="justify-content-end">
              <NavItem>
                <NavLink active onClick={() => toggleLanguage()} style={{ cursor: 'pointer' }}>
                  <i className="fa fa-language" />
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        )}
      </I18n>
    );
  }
}

export default Header;
