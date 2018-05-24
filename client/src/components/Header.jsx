import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { toggleLanguage } from '../utils/i18n';

class Header extends Component {
  render() {
    return (
      <Nav pills className="justify-content-end">
        <NavItem>
          <NavLink onClick={() => toggleLanguage()} active>
            <i className="fa fa-language" />
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default Header;
