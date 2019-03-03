import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Form } from './styles.account';
import { CURRENT_USER_QUERY } from '../user';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class CreateAccount extends Component {
  state = {
    email: '',
    name: '',
    password: '',
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
                <label htmlFor="email">
                  <p>Email</p>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleState}
                  />
                </label>
                <label htmlFor="name">
                  <p>Username</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    value={this.state.name}
                    onChange={this.handleState}
                  />
                </label>
                <label htmlFor="password">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleState}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateAccount;
