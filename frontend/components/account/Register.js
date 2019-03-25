import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';

import { Form } from './account.styles';
import { DNInput } from '../layout/layout.styles';
import { CURRENT_USER_QUERY } from '../user';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($email: String!, $name: String!, $password: String!, $avatar: String!) {
    createUser(email: $email, name: $name, password: $password, avatar: $avatar) {
      id
      email
      name
    }
  }
`;

class Register extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    avatar: 'https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png?fit=204%2C204',
  }
  handleState = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Mutation
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
        mutation={CREATE_USER_MUTATION}
        onCompleted={() => {
          if(window.location.pathname === '/account') {
            Router.push('/');
          }
        }}
        variables={this.state}>
        {(createUser, { error, loading }) => {
          return (
            <Form method="POST" onSubmit={async e => {
              e.preventDefault();
              const response = await createUser();
              this.setState({
                name: '',
                password: '',
                email: '',
              });
            }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Create New Account</h2>
                {error ? error.message : null}
                <DNInput>
                  <input
                    type="text"
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
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleState}
                  />
                  <span className="bar"></span>
                  <span className="highlight"></span>
                  <label htmlFor="name">
                    Username
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
                <button type="submit" data-button>Register</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Register;
