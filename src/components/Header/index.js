import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Title } from './styled';

const Header = props => (
  <header>
    <Nav>
      <ul>
        <li>
          <a href="/wholesale">Wholesale</a>
        </li>
        <li>
          <a href="/shipping">Shipping</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </Nav>
    <Title>{props.title}</Title>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
