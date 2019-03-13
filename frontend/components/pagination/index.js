import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';

import Loading from '../loading';
import { perPage } from '../../config';
import PaginationContainer from './pagination.styles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    songsConnection {
      aggregate {
        count
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

export default Pagination;
