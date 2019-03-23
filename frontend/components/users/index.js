import React, { Component } from 'react';
import Router from 'next/router';
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
      songs {
        id
      }
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
                <Avatar
                  avatar={user.avatar}
                  alt={user.name}
                  onClick={() => Router.push({
                  pathname: '/user',
                  query: {
                    id: user.id,
                  },
                })} />
                <p onClick={() => Router.push({
                  pathname: '/user',
                  query: {
                    id: user.id,
                  },
                })}>{user.name}</p>
                <span>
                  <div><i className="fal fa-users"></i>0</div>
                  <div><i className="fal fa-cloud-upload"></i>{user.songs.length}</div>
                </span>
                <button>Follow</button>
              </UserListItem>
            ))
          }}
        </Query>
      </UserList>
    );
  }
}

export default Users;
