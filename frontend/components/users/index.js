import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Avatar from './Avatar';

import {
  UserList,
  UserListItem,
} from './users.styles';

import Loading from '../loading';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      avatar
    }
  }
`;

class Users extends Component {
  render() {
    return (
      <UserList>
        <Query query={ALL_USERS_QUERY}>
          {({ data, loading, error }) => {
            if(loading) return <Loading />
            return data.users.map(user => (
              <UserListItem key={user.id}>
                <Avatar avatar={user.avatar} alt={user.name} />
                <p>{user.name}</p>
              </UserListItem>
            ))
          }}
        </Query>
      </UserList>
    );
  }
}

export default Users;
