import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Form } from './styles.account';
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
    return (
      <Mutation
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
        mutation={LOGIN_MUTATION}
        onCompleted={() => Router.push('/')}
        variables={this.state}>
        {(login, { error, loading }) => {
          return (
            <Form
              method="POST"
              onSubmit={async e => {
                e.preventDefault();
                const response = await login();
                console.log(response);
                this.setState({
                  email: '',
                  password: '',
                });
              }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Login To Your Account</h2>
                {error ? error.message : null}
                <label htmlFor="email">
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleState}
                  />
                </label>
                <label htmlFor="password">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleState}
                  />
                </label>
                <button type="submit">Login</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Login;
