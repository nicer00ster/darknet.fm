import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';

import Loading from '../loading';
import { perPage, userPerPage } from '../../config';
import {
  PaginationContainer,
  UserSongPaginationContainer,
  UserFollowerPaginationContainer,
} from './pagination.styles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    songsConnection {
      aggregate {
        count
      }
    }
  }
`;

const USER_SONG_PAGINATION_QUERY = gql`
  query USER_SONG_PAGINATION_QUERY($id: ID!) {
    usersConnection(where: {
      id: $id
    }) {
      edges {
        node {
          id
          email
          name
          avatar
          songs {
            id
            artist
            description
            image
            song
            tags
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

const USER_FOLLOWERS_PAGINATION_QUERY = gql`
  query USER_FOLLOWERS_PAGINATION_QUERY($id: ID!) {
    usersConnection(where: {
      id: $id
    }) {
      edges {
        node {
          id
          email
          name
          avatar
          followers {
            id
            name
            email
            avatar
            songs {
              id
            }
            followers {
              id
              avatar
            }
          }
        }
      }
    }
  }
`;

const USER_FOLLOWING_PAGINATION_QUERY = gql`
  query USER_FOLLOWING_PAGINATION_QUERY($id: ID!) {
    usersConnection(where: {
      id: $id
    }) {
      edges {
        node {
          id
          email
          name
          avatar
          following {
            id
            name
            email
            avatar
            songs {
              id
            }
            following {
              id
              avatar
            }
          }
        }
      }
    }
  }
`;

const USER_LIKES_PAGINATION_QUERY = gql`
  query USER_LIKES_PAGINATION_QUERY($id: ID!) {
    usersConnection(where: {
      id: $id
    }) {
      edges {
        node {
          id
          email
          name
          avatar
          likedSongs {
            id
            title
            likes {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const Pagination = props => (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if(loading) return <Loading />
        const count = data.songsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationContainer>
            <Link prefetch href={{
              pathname: 'library',
              query: {
                page: props.page - 1
              }
            }}>
              <a aria-disabled={props.page <= 1}>
                <i className="fal fa-chevron-double-left fa-2x"></i>
              </a>
            </Link>
            <p>Page {props.page} of {pages}</p>
            <Link prefetch href={{
              pathname: 'library',
              query: {
                page: props.page + 1
              }
            }}>
              <a aria-disabled={props.page >= pages}>
                <i className="fal fa-chevron-double-right fa-2x"></i>
              </a>
            </Link>
          </PaginationContainer>
        );
      }}
    </Query>
);

const UserLikesPagination = props => (
    <Query query={USER_LIKES_PAGINATION_QUERY} variables={{
      id: props.id,
      skip: props.page * userPerPage - userPerPage,
    }}>
      {({ data, loading, error }) => {
        if(loading) return <Loading />
        const count = data.usersConnection.edges[0].node.likedSongs.length;
        const pages = Math.ceil(count / userPerPage);
        return (
          <UserSongPaginationContainer>
            <Link prefetch href={{
              pathname: 'user',
              query: {
                id: props.id,
                likes: props.name,
                page: props.page - 1
              }
            }}>
              <a aria-disabled={props.page <= 1}>
                <i className="fal fa-chevron-double-left fa-2x"></i>
              </a>
            </Link>
            {props.children}
            <Link prefetch href={{
              pathname: 'user',
              query: {
                id: props.id,
                likes: props.name,
                page: props.page + 1
              }
            }}>
              <a aria-disabled={props.page >= pages}>
                <i className="fal fa-chevron-double-right fa-2x"></i>
              </a>
            </Link>
          </UserSongPaginationContainer>
        );
      }}
    </Query>
);

const UserSongPagination = props => (
    <Query query={USER_SONG_PAGINATION_QUERY} variables={{
      id: props.id,
      skip: props.page * userPerPage - userPerPage,
    }}>
      {({ data, loading, error }) => {
        if(loading) return <Loading />
        const count = data.usersConnection.edges[0].node.songs.length;
        const pages = Math.ceil(count / userPerPage);
        return (
          <UserSongPaginationContainer>
            <Link prefetch href={{
              pathname: 'user',
              query: {
                id: props.id,
                uploads: props.name,
                page: props.page - 1
              }
            }}>
              <a aria-disabled={props.page <= 1}>
                <i className="fal fa-chevron-double-left fa-2x"></i>
              </a>
            </Link>
            {props.children}
            <Link prefetch href={{
              pathname: 'user',
              query: {
                id: props.id,
                uploads: props.name,
                page: props.page + 1
              }
            }}>
              <a aria-disabled={props.page >= pages}>
                <i className="fal fa-chevron-double-right fa-2x"></i>
              </a>
            </Link>
          </UserSongPaginationContainer>
        );
      }}
    </Query>
);

const UserFollowerPagination = props => (
    <Query query={USER_FOLLOWERS_PAGINATION_QUERY} variables={{
      id: props.id,
      skip: props.page * userPerPage - userPerPage,
    }}>
      {({ data, loading, error }) => {
        if(loading) return <Loading />
        const count = data.usersConnection.edges[0].node.followers.length;
        const pages = Math.ceil(count / userPerPage);
        return (
          <UserFollowerPaginationContainer>
            <Link prefetch href={{
              pathname: 'user',
              query: {
                id: props.id,
                followers: props.name,
                page: props.page - 1
              }
            }}>
              <a aria-disabled={props.page <= 1}>
                <i className="fal fa-chevron-double-left fa-2x"></i>
              </a>
            </Link>
            {props.children}
            <Link prefetch href={{
              pathname: 'user',
              query: {
                id: props.id,
                followers: props.name,
                page: props.page + 1
              }
            }}>
              <a aria-disabled={props.page >= pages}>
                <i className="fal fa-chevron-double-right fa-2x"></i>
              </a>
            </Link>
          </UserFollowerPaginationContainer>
        );
      }}
    </Query>
);

const UserFollowingPagination = props => (
    <Query query={USER_FOLLOWING_PAGINATION_QUERY} variables={{
      id: props.id,
      skip: props.page * userPerPage - userPerPage,
    }}>
      {({ data, loading, error }) => {
        if(loading) return <Loading />
        const count = data.usersConnection.edges[0].node.following.length;
        const pages = Math.ceil(count / userPerPage);
        return (
          <UserFollowerPaginationContainer>
            <Link prefetch href={{
              pathname: 'user',
              query: {
                id: props.id,
                following: props.name,
                page: props.page - 1
              }
            }}>
              <a aria-disabled={props.page <= 1}>
                <i className="fal fa-chevron-double-left fa-2x"></i>
              </a>
            </Link>
            {props.children}
            <Link prefetch href={{
              pathname: 'user',
              query: {
                id: props.id,
                following: props.name,
                page: props.page + 1
              }
            }}>
              <a aria-disabled={props.page >= pages}>
                <i className="fal fa-chevron-double-right fa-2x"></i>
              </a>
            </Link>
          </UserFollowerPaginationContainer>
        );
      }}
    </Query>
);

export {
  PAGINATION_QUERY,
  USER_SONG_PAGINATION_QUERY,
  UserSongPagination,
  UserFollowerPagination,
  UserFollowingPagination,
  UserLikesPagination,
}

export default Pagination;
