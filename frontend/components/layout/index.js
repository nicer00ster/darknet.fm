import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';

import Header from '../header'
import Meta from '../meta';
import Toast from '../toast';
import DNLayout from './layout.styles';

const theme = {
  maxWidth: '1080px',
  black: '#1f222e',
  white: '#fefefe',
  error: '#e95e5e',
  shadow: '0px 5px 25px 0px rgba(46, 61, 73, 0.2)',
  radius: '0.375rem',
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
      background-color: ${theme.white};
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
        <ToastProvider
          autoDismissTimeout={6000}>
          <DNLayout>
            <Meta />
            <Header />
            {this.props.children}
          </DNLayout>
        </ToastProvider>
      </ThemeProvider>
    );
  }
}

export default Layout;
