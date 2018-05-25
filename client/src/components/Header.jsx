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
          <Navbar light className="container mb-4">
            <NavbarBrand href="/" className="mr-auto text-primary">
              <i className="fa fa-home mr-2" />
              {t('title')}
            </NavbarBrand>
            <Nav pills className={classnames('justify-content-end', fixedTop)}>
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
