import React, { Component } from 'react';
import { withToastManager, ToastConsumer } from 'react-toast-notifications';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TOAST_MUTATION = gql`
  mutation TOAST_MUTATION($message: String, $error: String) {
    toast(message: $message, error: $error) {
      message,
      error,
    }
  }
`;

class ToastListener extends Component {
  state = {
    isOnline: true
  };

  onlineCallback = () => {
    this.props.toastManager.remove(this.offlineToastId);
    this.offlineToastId = null;
  };
  offlineCallback = id => {
    this.offlineToastId = id;
  }
  componentDidMount() {
    this.setState({ isOnline: window ? window.navigator.onLine : false });

    window.addEventListener('online', () => {
      this.setState({ isOnline: true });
      this.props.toastManager.add('You\'re back online!', {
        appearance: 'success',
        autoDismiss: true,
      }, this.onlineCallback);
    });

    window.addEventListener('offline', () => {
      this.setState({ isOnline: false });
      this.props.toastManager.add('You are offline! Changes you make may not be saved.', {
        appearance: 'info',
        autoDismiss: this.state.isOnline,
      }, this.offlineCallback);
    });
  }

  render() {
    return null;
  }
}

export default withToastManager(ToastListener);
