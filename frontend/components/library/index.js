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
  SongImage,
} from './library.styles';

const ALL_SONGS_QUERY = gql`
  query ALL_SONGS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    songs(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      artist
      title
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
                      <SongImage className="art" src={song.image} />
                      <div className="details">
                        <p className="artist">{song.artist}</p>
                        <p className="description">{song.title}</p>
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
