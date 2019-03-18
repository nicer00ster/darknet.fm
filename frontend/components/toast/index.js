import React, { Component } from 'react';
import { withToastManager, ToastConsumer, ToastProvider } from 'react-toast-notifications';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const Toast = ({ content, toastManager }) => (
  <button onClick={() => toastManager.add(content, {
    appearance: 'success',
    autoDismiss: true,
  })}>
    Add Toast
  </button>
);

export default withToastManager(Toast);
