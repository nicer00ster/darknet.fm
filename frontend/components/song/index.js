import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';

import User from '../user';
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
import { VIEW_USER_QUERY } from '../user/ViewUser';

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
      likes {
        id
        name
      }
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

const LIKE_SONG_MUTATION = gql`
  mutation LIKE_SONG_MUTATION($id: ID!, $userId: ID!) {
    likeSong(id: $id, userId: $userId, where: {
      id: $id,
    }) {
      likes {
        id
        name
      }
    }
  }
`;

const UNLIKE_SONG_MUTATION = gql`
  mutation UNLIKE_SONG_MUTATION($id: ID!, $userId: ID!) {
    unlikeSong(id: $id, userId: $userId, where: {
      id: $id,
    }) {
      likes {
        id
        name
      }
    }
  }
`;

const songQuery = ({ render, id }) => (
  <Query
    query={SONG_QUERY}
    variables={{
      id,
    }}>
    {(query, data) => render({ query, data })}
  </Query>
);

const likeSong = ({ render, id, userId }) => (
  <Mutation
    mutation={LIKE_SONG_MUTATION}
    refetchQueries={[
      { query: SONG_QUERY, variables: { id } },
      { query: VIEW_USER_QUERY, variables: { id: userId } },
    ]}
    variables={{ id, userId }}>
    {(mutation, data) => render({ mutation, data })}
  </Mutation>
);

const unlikeSong = ({ render, id, userId }) => (
  <Mutation
    mutation={UNLIKE_SONG_MUTATION}
    refetchQueries={[
      { query: SONG_QUERY, variables: { id } },
      { query: VIEW_USER_QUERY, variables: { id: userId } },
    ]}
    variables={{ id, userId }}>
    {(mutation, data) => render({ mutation, data })}
  </Mutation>
);

const Composed = adopt({
  songQuery,
  likeSong,
  unlikeSong,
});

class Song extends Component {
  render() {
    return (
      <User>
        {({ data: { currentUser } }) => (
          <Composed id={this.props.id} userId={currentUser && currentUser.id}>
            {({ songQuery: { query: { data, loading, error } }, likeSong, unlikeSong }) => {
              if(error) return <p>{error}</p>
              if(loading) return <Loading />
              if(!data.song) return <p>No song found for {this.props.id}</p>
              let song = data.song;
              return (
                <SongContainer>
                  <Head>
                    <title>DARKNET.FM | {song.title}</title>
                  </Head>
                  <Foreground>
                    <Player
                      userId={currentUser && currentUser.id}
                      isSongLikedByCurrentUser={currentUser && song.likes.some(user => user.id === currentUser.id)}
                      numberOfLikes={song.likes.length}
                      likeSong={likeSong}
                      unlikeSong={unlikeSong}
                      audio={song.song}>
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
          </Composed>
        )}
      </User>
    );
  }
}

export { SONG_QUERY };
export default Song;
