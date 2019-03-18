import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Loading from '../loading';
import { perPage } from '../../config';
import {
  LibraryContainer,
  SongList,
  SongListItem,
} from './library.styles';

const ALL_SONGS_QUERY = gql`
  query ALL_SONGS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    songs(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
      <LibraryContainer>
        Library of songs
        <Query query={ALL_SONGS_QUERY} variables={{
          skip: this.props.page * perPage - perPage,
        }}>
          {({ data, loading, error }) => {
            if(loading) return <Loading />
            return (
              <SongList>
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
              </SongList>
            );
          }}
        </Query>
      </LibraryContainer>
    );
  }
}

export { ALL_SONGS_QUERY };
export default Library;
