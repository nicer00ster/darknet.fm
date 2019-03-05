import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';

import Loading from '../loading';
import {
  SongContainer,
  Foreground,
  ArtWrapper,
  Artwork,
  TitleContainer,
  Title,
  PlayButton,
} from './song.styles';

const SONG_QUERY = gql`
  query SONG_QUERY($id: ID!) {
    song(where: {
      id: $id
    }) {
      id
      title
      description
      image
    }
  }
`;

class Song extends Component {
  render() {
    return (
      <Query
        query={SONG_QUERY}
        variables={{
          id: this.props.id,
        }}>
        {({ error, loading, data }) => {
          if(error) return <p>{error}</p>
          if(loading) return <Loading />
          if(!data.song) return <p>No song found for {this.props.id}</p>
          const song = data.song;
          return (
            <SongContainer>
              <Head>
                <title>DARKNET.FM | {song.title}</title>
              </Head>
              <Foreground>
                <ArtWrapper>
                  <img src={song.image} alt={song.title}/>
                </ArtWrapper>
                <TitleContainer>
                  <PlayButton>
                    <button>▷</button>
                  </PlayButton>
                  <Title>
                    {song.title}
                  </Title>
                </TitleContainer>
              </Foreground>
            </SongContainer>
          );
        }}
      </Query>
    );
  }
}

export { SONG_QUERY };
export default Song;
