import styled from 'styled-components';

export const Nav = styled.nav`
  float: right;
  margin-top: 0.5em;
  display: none;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    margin-left: 1.5em;
  }

  a {
    color: darkgreen;
  }

  @media screen and (min-width: 737px) {
    display: block;
  }
`;

export const Title = styled.h1`
  font-size: 2.1em;

  @media screen and (min-width: 737px) {
    font-size: 2.5em;
  }
`;
