import React, { Component } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import ReactTooltip from 'react-tooltip';

import Avatar from './Avatar';
import {
  UserList,
  UserListItem,
} from './users.styles';
import User from '../user';
import Loading from '../loading';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      avatar
      followers {
        id
        name
      }
      songs {
        id
      }
    }
  }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation FOLLOW_USER_MUTATION($email: String!, $id: ID!) {
    followUser(email: $email, id: $id, where: {
      email: $email
    }) {
      id
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation UNFOLLOW_USER_MUTATION($email: String!, $id: ID!) {
    unfollowUser(email: $email, id: $id, where: {
      email: $email
    }) {
      id
    }
  }
`;

const UPLOAD_AVATAR_MUTATION = gql`
  mutation UPLOAD_AVATAR_MUTATION($avatar: String!, $email: String!) {
    uploadAvatar(avatar: $avatar, where: {
      email: $email
    }) {
      avatar
    }
  }
`;

const followUser = ({ render, email, id }) => (
  <Mutation
    mutation={FOLLOW_USER_MUTATION}
    refetchQueries={[
      { query: ALL_USERS_QUERY }
    ]}
    variables={{ email, id }}>
    {(mutation, data) => render({ mutation, data })}
  </Mutation>
);

const unfollowUser = ({ render, email, id }) => (
  <Mutation
    mutation={UNFOLLOW_USER_MUTATION}
    refetchQueries={[
      { query: ALL_USERS_QUERY }
    ]}
    variables={{ email, id }}>
    {(mutation, data) => render({ mutation, data })}
  </Mutation>
);

const Composed = adopt({
  followUser,
  unfollowUser,
});

class Users extends Component {
  render() {
    return (
      <User>
        {({ data: { currentUser } }) => {
          return (
            <UserList>
              <Query query={ALL_USERS_QUERY}>
                {({ data, loading, error }) => {
                  if(loading) return <Loading />
                  return data.users.map(user => (
                    <UserListItem key={user.id}>
                      <Avatar
                        avatar={user.avatar}
                        style={{ width: 65, height: 65 }}
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
                        <Composed email={user.email} id={user.id}>
                          {({ followUser, unfollowUser }) => {
                            if(currentUser && user.followers.some(follower => follower.id === currentUser.id)) {
                              return (
                                <>
                                <span>
                                  <div>
                                    <i data-tip={`${user.followers.length} follower${user.followers.length === 1 ? '' : 's'}`} className="fal fa-users"></i>
                                    {user.followers.length}
                                    <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip" />
                                  </div>
                                  <div>
                                    <i data-tip={`${user.songs.length} upload${user.songs.length === 1 ? '' : 's'}`} className="fal fa-cloud-upload"></i>
                                    {user.songs.length}
                                    <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip" />
                                  </div>
                                </span>
                                <button
                                  type="button"
                                  data-button
                                  disabled={unfollowUser.data.loading}
                                  aria-disabled={unfollowUser.data.loading}
                                  onClick={unfollowUser.mutation}>
                                  Unfollow
                                  {unfollowUser.data.loading ? <Loading /> : null}
                                </button>
                                </>
                              );
                            } else {
                              return (
                                <>
                                <span>
                                  <div>
                                    <i data-tip={`${user.followers.length} follower${user.followers.length === 1 ? '' : 's'}`} className="fal fa-users"></i>
                                    {user.followers.length}
                                    <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip" />
                                  </div>
                                  <div>
                                    <i data-tip={`${user.songs.length} upload${user.songs.length === 1 ? '' : 's'}`} className="fal fa-cloud-upload"></i>
                                    {user.songs.length}
                                    <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip" />
                                  </div>
                                </span>
                                {currentUser && user.id === currentUser.id
                                  ? null
                                  : <button
                                      type="button"
                                      data-button
                                      disabled={followUser.data.loading}
                                      aria-disabled={followUser.data.loading}
                                      onClick={followUser.mutation}>
                                      Follow
                                      {followUser.data.loading ? <Loading /> : null}
                                    </button>}
                                </>
                              );
                            }
                          }}
                        </Composed>
                    </UserListItem>
                  ))
                }}
              </Query>
            </UserList>
          );
        }}
      </User>
    );
  }
}

export { Composed, ALL_USERS_QUERY };
export default Users;
