import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';

const Toast = ({ toastManager, content }) => {
  return toastManager.add(content, {
    appearance: 'success',
    autoDismiss: true,
  });
};

export default withToastManager(Toast);
