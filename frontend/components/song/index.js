import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';

import Player from './Player';
import Loading from '../loading';
import {
  SongContainer,
  Foreground,
  ArtWrapper,
  Artwork,
  TitleContainer,
  Title,
  Headline,
  UserAndTitle,
  Tag,
  PlayButton,
  SongMetaData,
} from './song.styles';

const SONG_QUERY = gql`
  query SONG_QUERY($id: ID!) {
    song(where: {
      id: $id
    }) {
      id
      artist
      title
      description
      image
      song
      createdAt
      tags
      user {
        id
        name
      }
    }
  }
`;

const SONG_USER_QUERY = gql`
  query SONG_USER_QUERY($id: ID!) {
    songsConnection(where: {
      user: {
        id: $id
      }
    }) {
      edges {
        node {
          id
          image
          artist
          title
          description
          song
        }
      }
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
                <Player audio={song.song}>
                  <ArtWrapper>
                    <img src={song.image} alt={song.title}/>
                  </ArtWrapper>
                  <TitleContainer>
                    <UserAndTitle>
                      <Headline>
                        <Link href={`user?id=${song.user.id}`}>
                          <a>Uploaded by {song.user.name}</a>
                        </Link>
                      </Headline>
                      <Title>
                        <a href="#">{song.artist}</a>
                        <p>{song.title}</p>
                      </Title>
                    </UserAndTitle>
                  </TitleContainer>
                  <SongMetaData>
                    <div>{moment(song.createdAt).fromNow()}</div>
                    <div>
                      {song.tags.map((tag, index) => {
                        if(index < 2) {
                          return (
                            <Tag key={index}>
                              <span>{tag}</span>
                            </Tag>
                          );
                        }
                      })}
                    </div>
                  </SongMetaData>
                </Player>
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
