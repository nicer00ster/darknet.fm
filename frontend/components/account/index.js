import React, { Component } from 'react';
import gql from 'graphql-tag';

import { Form, TabContainer } from './account.styles';
import Login from './Login';
import Register from './Register';
import RequestReset from './RequestReset';

class Account extends Component {
  state = {
    currentTab: 'login',
  }
  handleTab = e => {
    this.setState({ currentTab: e.target.value });
  }
  renderTab() {
    if(this.state.currentTab === 'login') {
      return <Login />
    } else if(this.state.currentTab === 'register') {
      return <Register />
    } else {
      return <RequestReset />
    }
  }
  render() {
    return (
      <>
        <TabContainer>
          <button data-button onClick={e => this.handleTab(e)} value="login">Login</button>
          <button data-button onClick={e => this.handleTab(e)} value="register">Register</button>
          <button data-button onClick={e => this.handleTab(e)} value="resetPassword">Reset Password</button>
        </TabContainer>
        {this.renderTab()}
      </>
    );
  }
}

export default Account;
