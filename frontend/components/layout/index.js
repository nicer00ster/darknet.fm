import React, { Component } from 'react';
import Header from '../header'
import Meta from '../meta';
import DNLayout from './layout.styles';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
  maxWidth: '1080px',
  black: '#1f222e',
  white: '#fefefe',
};

injectGlobal`
    html {
      box-sizing: border-box;
      font-size: 10px;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      padding: 0;
      margin: 0;
      font-size: 1.5rem;
      line-height: 2;
    }
    a {
      text-decoration: none;
      color: ${theme.black};
    }
`;

class Layout extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <DNLayout>
          <Meta />
          <Header />
          {this.props.children}
        </DNLayout>
      </ThemeProvider>
    );
  }
}

export default Layout;
