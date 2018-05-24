import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { toggleLanguage } from '../utils/i18n';

class Header extends Component {
  render() {
    const fixedTop = {
      'fixed-top': this.props.fixedTop
    };

    return (
      <Nav pills className={classnames('justify-content-end', 'container', 'p-4', fixedTop)}>
        <NavItem>
          <NavLink active onClick={() => toggleLanguage()} style={{ cursor: 'pointer' }}>
            <i className="fa fa-language" />
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default Header;
