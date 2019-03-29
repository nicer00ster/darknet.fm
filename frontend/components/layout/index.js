import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal, css } from 'styled-components';
import { ToastProvider } from 'react-awesome-toasts';

import Header from '../header'
import Meta from '../meta';
import Toast from '../toast';
import { DNLayout } from './layout.styles';

const sizes = {
  desktop: 1080,
  tablet: 768,
  phone: 576,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {});

const theme = {
  maxWidth: '1080px',
  black: '#1f222e',
  lightBlack: 'rgba(31, 34, 46, 0.75)',
  hover: 'rgba(31, 34, 46, 0.25)',
  grey: '#cacacc',
  white: '#fefefe',
  red: '#e95e5e',
  yellow: '#ffeaa7',
  lightRed: 'rgba(233, 94, 94, 0.75)',
  shadow: '0px 5px 25px 0px rgba(46, 61, 73, 0.2)',
  shadowHover: '2px 4px 8px 0px rgba(46, 61, 73, 0.2);',
  radius: '0.375rem',
  media: media,
  sizes: sizes,
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
      overflow-x: hidden;
      ${media.tablet`
        font-size: 1rem;
      `}
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
    [data-button] {
      display: flex;
      justify-content: center;
      position: relative;
      color: ${theme.black};
      background-color: transparent;
      text-transform: uppercase;
      font-size: 11px;
      padding: 1rem;
      cursor: pointer;
      white-space: nowrap;
      border: 0;
      outline: 0;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: .1em;
        bottom: 0;
        left: 0;
        background-color: ${theme.black};
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.15s ease-in-out 0s;
        transition: all 0.15s ease-in-out 0s;
      }
      &:hover:before, &:focus:before {
        visibility: visible;
        -webkit-transform: scaleX(.5);
        transform: scaleX(.5);
      }
      &:hover, &:focus {
        color: ${theme.black};
      }
      &:disabled {
        color: ${theme.grey};
      }
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-text-fill-color: ${theme.black};
      -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    }
    .tooltip {
      font-size: 11px;
      padding: 4px;
      background-color: ${theme.black} !important;
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
