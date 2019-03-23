import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { CURRENT_USER_QUERY } from '../user';
import { Form } from './account.styles';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

class ResetPassword extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }
  state = {
    password: '',
    confirmPassword: '',
  };
  handleState = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Mutation
        refetchQueries={[
          { query: CURRENT_USER_QUERY },
        ]}
        mutation={RESET_PASSWORD_MUTATION}
        onCompleted={() => Router.push('/')}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}>
        {(resetPassword, { error, loading, called }) => {
          return (
            <Form
              data-test="form"
              method="POST"
              onSubmit={async e => {
                e.preventDefault();
                await resetPassword();
                this.setState({
                  password: '',
                  confirmPassword: '',
                });
              }}>
              <fieldset
                disabled={loading}
                aria-busy={loading}>
                <h2>Reset Your Password</h2>
                {error ? error.message : null}
                <label htmlFor="password">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleState} />
                </label>
                <label htmlFor="confirmPassword">
                  <p>Confirm Password</p>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.handleState} />
                </label>
                <button type="submit">Reset</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default ResetPassword;
