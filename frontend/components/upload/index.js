import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import Toast from '../toast';

class Upload extends Component {
  render() {
    return (
      <button onClick={() => <Toast />}>
        click
      </button>
    );
  }
}

export default withToastManager(Upload);
