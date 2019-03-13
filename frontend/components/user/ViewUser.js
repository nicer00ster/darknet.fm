import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import Loading from '../loading';

const VIEW_USER_QUERY = gql`
  query VIEW_USER_QUERY($id: ID!) {
    user(where: {
      id: $id
    }) {
      id
      name
      email
    }
  }
`;

class ViewUser extends Component {
  render() {
    return (
      <Query query={VIEW_USER_QUERY} variables={{
        id: this.props.id
      }}>
        {({ data, loading, error }) => {
          if(loading) return <Loading />
          if(error) return <p>Error: {error}</p>
          console.log(data);
          return (
            <p>{data.user.name}</p>
          )
        }}
      </Query>
    );
  }
}

export { VIEW_USER_QUERY };
export default ViewUser;
