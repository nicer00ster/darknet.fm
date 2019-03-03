import React, { Component } from 'react';
import gql from 'graphql-tag';

import { Form, TabContainer } from './styles.account';
import Login from './Login';
import CreateAccount from './CreateAccount';
import ResetPassword from './ResetPassword';

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
      return <CreateAccount />
    } else {
      return <ResetPassword />
    }
  }
  render() {
    return (
      <>
        <TabContainer>
          <button onClick={e => this.handleTab(e)} value="login">Login</button>
          <button onClick={e => this.handleTab(e)} value="register">Register</button>
          <button onClick={e => this.handleTab(e)} value="resetPassword">Reset Password</button>
        </TabContainer>
        {this.renderTab()}
      </>
    );
  }
}

export default Account;
