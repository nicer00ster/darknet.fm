import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Form } from './account.styles';
import { DNInput } from '../layout/layout.styles';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class ResetPassword extends Component {
  state = { email: '' };
  handleState = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}>
        {(requestReset, { error, loading, called }) => {
          return (
            <Form
              data-test="form"
              method="POST"
              onSubmit={async e => {
                e.preventDefault();
                await requestReset();
                this.setState({ email: '' });
              }}>
              <fieldset
                disabled={loading}
                aria-busy={loading}>
                <h2>Request a Password Reset</h2>
                {error ? error.message : null}
                {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
                <DNInput>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleState} />
                  <span className="bar"></span>
                  <span className="highlight"></span>
                  <label htmlFor="email">
                    Email
                  </label>
                </DNInput>
                <button type="submit" data-button>Request</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>

    );
  }
}

export default ResetPassword;
