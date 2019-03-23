import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import { ToastProvider } from 'react-awesome-toasts';

import Header from '../header'
import Meta from '../meta';
import Toast from '../toast';
import { DNLayout } from './layout.styles';

const theme = {
  maxWidth: '1080px',
  black: '#1f222e',
  lightBlack: 'rgba(31, 34, 46, 0.75)',
  hover: 'rgba(31, 34, 46, 0.25)',
  grey: '#cacacc',
  white: '#fefefe',
  red: '#e95e5e',
  lightRed: 'rgba(233, 94, 94, 0.75)',
  shadow: '0px 5px 25px 0px rgba(46, 61, 73, 0.2)',
  shadowHover: '2px 4px 8px 0px rgba(46, 61, 73, 0.2);',
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
    ul {
      list-style-position: outside;
      padding: 0;
      margin: 0;
    }
    button {
      font-family: 'Raleway';
      background: none;
      cursor: pointer;
      border: 1px solid ${theme.grey};
      border-radius: ${theme.radius};
      outline: 0;
      padding: 1rem;
    }
`;

class Layout extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ToastProvider position="top-right">
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
