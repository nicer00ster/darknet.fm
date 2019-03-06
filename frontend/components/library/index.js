import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { LibraryContainer, SongListItem } from './library.styles';

const ALL_SONGS_QUERY = gql`
  query ALL_SONGS_QUERY {
    songs {
      id
      title
      description
      image
      user {
        id
        name
      }
    }
  }
`;

class Library extends Component {
  routeToSong = (song, e) => {
    Router.push({
      pathname: '/song',
      query: {
        id: song.id,
      },
    });
  }
  render() {
    return (
      <div>
        Library of songs
        <Query query={ALL_SONGS_QUERY}>
          {({ data, loading, error }) => {
            if(loading) return <p>loading</p>
            console.log(data);
            return (
              <LibraryContainer>
                {data.songs.map(song => {
                  return (
                    <SongListItem onClick={() => this.routeToSong(song)} key={song.id}>
                      <div className="art">
                        <img src={song.image} alt={song.title}/>
                      </div>
                      <div className="details">
                        <p className="title">{song.title}</p>
                        <p className="description">{song.description}</p>
                      </div>
                    </SongListItem>
                  );
                })}
              </LibraryContainer>
            );
          }}
        </Query>
      </div>
    );
  }
}

export { ALL_SONGS_QUERY };
export default Library;
