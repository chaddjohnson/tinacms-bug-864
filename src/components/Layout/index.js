import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import { Container } from './styled';

const Layout = props => (
  <Container>
    <Header title={props.title} />
    <div>{props.children}</div>
  </Container>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired
};

export default Layout;
