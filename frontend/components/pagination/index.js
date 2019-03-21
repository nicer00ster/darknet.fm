import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';

import Loading from '../loading';
import { perPage, userPerPage } from '../../config';
import {
  PaginationContainer,
  UserSongPaginationContainer,
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
          songs {
            id
            title
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
              <a aria-disabled={props.page <= 1}>Prev</a>
            </Link>
            <p>Page {props.page} of {pages}</p>
            <Link prefetch href={{
              pathname: 'library',
              query: {
                page: props.page + 1
              }
            }}>
              <a aria-disabled={props.page >= pages}>
                More
              </a>
            </Link>
          </PaginationContainer>
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
              <a aria-disabled={props.page <= 1}>Prev</a>
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
                More
              </a>
            </Link>
          </UserSongPaginationContainer>
        );
      }}
    </Query>
);


export {
  PAGINATION_QUERY,
  USER_SONG_PAGINATION_QUERY,
  UserSongPagination,
}

export default Pagination;
