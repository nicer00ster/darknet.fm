import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import {
  UserList,
  UserListItem,
  Avatar,
} from './users.styles';

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
      <UserList>
        <Query query={ALL_USERS_QUERY}>
          {({ data, loading, error }) => {
            if(loading) return <Loading />
            return data.users.map(user => (
              <UserListItem key={user.id}>
                <Avatar src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
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
