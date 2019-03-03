import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_SONGS_QUERY = gql`
  query ALL_SONGS_QUERY {
    songs {
      id
      title
      description
      image
    }
  }
`;

class Library extends Component {
  render() {
    return (
      <div>
        Library of songs
        <Query query={ALL_SONGS_QUERY}>
          {({ data, loading, error }) => {
            if(loading) return <p>loading</p>
            console.log(data);
            return (
              <ul>
                {data.songs.map(item => {
                  return <li key={item.id}>{item.title}</li>
                })}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Library;
