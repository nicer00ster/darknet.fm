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
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      src: url('/static/fonts/raleway-v12-latin-regular.eot');
      src: local('Raleway'), local('Raleway-Regular'),
           url('/static/fonts/raleway-v12-latin-regular.eot?#iefix') format('embedded-opentype'),
           url('/static/fonts/raleway-v12-latin-regular.woff2') format('woff2'),
           url('/static/fonts/raleway-v12-latin-regular.woff') format('woff'),
           url('/static/fonts/raleway-v12-latin-regular.ttf') format('truetype'),
           url('/static/fonts/raleway-v12-latin-regular.svg#Raleway') format('svg');
    }
    html {
      box-sizing: border-box;
      font-size: 10px;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      font-family: 'Raleway';
      font-size: 1.25rem;
      padding: 0;
      margin: 0;
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
