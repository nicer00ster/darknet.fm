import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Loading from '../loading';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
    }
  }
`;

class Users extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
          if(loading) return <Loading />
          return data.users.map(user => (
            <p key={user.id}>{user.name}</p>
          ))
        }}
      </Query>
    );
  }
}

export default Users;
