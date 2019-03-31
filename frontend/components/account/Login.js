import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Form } from './account.styles';
import { DNInput } from '../layout/layout.styles';
import { CURRENT_USER_QUERY } from '../user';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
  }
  handleState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { toastManager } = this.props;
    return (
      <Mutation
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
        mutation={LOGIN_MUTATION}
        onCompleted={() => {
          if(window.location.pathname === '/account') {
            Router.push('/');
          }
        }}
        variables={this.state}>
        {(login, { error, loading }) => {
          return (
            <Form
              method="POST"
              onSubmit={async e => {
                e.preventDefault();
                const response = await login();
                this.setState({
                  email: '',
                  password: '',
                });
              }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Login To Your Account</h2>
                {error ? error.message : null}
                <DNInput>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleState}
                  />
                  <span className="bar"></span>
                  <span className="highlight"></span>
                  <label htmlFor="email">
                    Email
                  </label>
                </DNInput>
                <DNInput>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleState}
                  />
                  <span className="bar"></span>
                  <span className="highlight"></span>
                  <label htmlFor="password">
                    Password
                  </label>
                </DNInput>
                <button type="submit" data-button>Login</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Login;
