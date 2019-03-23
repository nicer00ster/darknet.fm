import React, { Component } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import Loading from '../loading';
import {
  UserContainer,
  PhotoContainer,
  UserPhoto,
  ProfileTabs,
  Tab,
  AvatarForm,
  DetailsList,
  DetailsListItem,
} from './user.styles';
import {
  SongList,
  SongListItem,
} from '../library/library.styles';
import { DNNavItem } from '../header/header.styles';
import { UserSongPagination } from '../pagination';
import { userPerPage } from '../../config';
import User from './index';

const VIEW_USER_QUERY = gql`
  query VIEW_USER_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${userPerPage}) {
    user(where: {
      id: $id
    }) {
      id
      name
      email
      avatar
      songs(first: $first, skip: $skip, orderBy: createdAt_DESC) {
        id
        artist
        title
        description
        tags
  			image
        song
        createdAt
        updatedAt
      }
    }
  }
`;

const UPLOAD_AVATAR_MUTATION = gql`
  mutation UPLOAD_AVATAR_MUTATION($avatar: String!, $email: String!) {
    uploadAvatar(avatar: $avatar, where: {
      email: $email
    }) {
      avatar
    }
  }
`;

class ViewUser extends Component {
  state = {
    avatar: "",
  }
  routeToSong = (song, e) => {
    Router.push({
      pathname: '/song',
      query: {
        id: song.id,
      },
    });
  }
  uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'darknet.fm');
    const res = await fetch('https://api.cloudinary.com/v1_1/nicer00ster/image/upload', {
      method: 'POST',
      body: data,
    });

    const file = await res.json();

    this.setState({
      avatar: file.secure_url,
    });

  }
  render() {
    return (
      <User>
        {({ data: { currentUser } }) => {
          return (
            <Query query={VIEW_USER_QUERY} variables={{
              id: this.props.id,
              skip: this.props.query.page * userPerPage - userPerPage,
            }}>
              {({ data, loading, error }) => {
                if(loading) return <Loading />
                if(error) return <p>Error: {error}</p>
                return (
                  <UserContainer>
                    <PhotoContainer>
                      <Mutation
                        mutation={UPLOAD_AVATAR_MUTATION}
                        variables={{
                          email: data.user.email,
                          avatar: this.state.avatar,
                      }}>
                        {(uploadAvatar, { error, loading }) => {
                          if(loading) return <Loading />
                          if(currentUser && data.user.id !== currentUser.id) {
                            return (
                              <UserPhoto
                                src={data.user.avatar} />
                            );
                          } else {
                            return (
                              <AvatarForm onSubmit={async e => {
                                e.preventDefault();
                                const res = await uploadAvatar();
                              }}>
                              <fieldset disabled={loading} aria-busy={loading}>
                                <UserPhoto
                                  onClick={() => document.querySelector("#file").click()}
                                  src={this.state.avatar ? this.state.avatar : data.user.avatar} />
                                  <div>
                                    <input
                                      id="file"
                                      type="file"
                                      name="file"
                                      accept="image/*"
                                      placeholder="Upload Image"
                                      required
                                      onChange={this.uploadImage}
                                    />
                                    <button type="submit">Upload</button>
                                  </div>
                                </fieldset>
                              </AvatarForm>
                            );
                          }
                        }}
                      </Mutation>
                      <DetailsList>
                        <DetailsListItem>
                          <h2>{data.user.name}</h2>
                        </DetailsListItem>
                        <DetailsListItem>
                          <i className="fal fa-map-marker-alt fa-2x"></i>
                          <div>Philadelphia, PA</div>
                        </DetailsListItem>
                        <DetailsListItem>
                          <i className="fal fa-envelope fa-2x"></i>
                          <div>{data.user.email}</div>
                        </DetailsListItem>
                      </DetailsList>
                    </PhotoContainer>
                    <Tab>
                      <ProfileTabs>
                        {/* <DNNavItem>
                          <Link prefetch href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                            }
                          }}>
                            <a>Overview</a>
                          </Link>
                        </DNNavItem> */}
                        <DNNavItem>
                          <Link prefetch href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                              uploads: data.user.name,
                              page: parseFloat(this.props.query.page) || 1,
                            }
                          }}>
                            <a>Uploads</a>
                          </Link>
                        </DNNavItem>
                        <DNNavItem>
                          <Link prefetch href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                              followers: data.user.name,
                            }
                          }}>
                            <a>Followers</a>
                          </Link>
                        </DNNavItem>
                        <DNNavItem>
                          <Link prefetch href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                              following: data.user.name
                            }
                          }}>
                            <a>Following</a>
                          </Link>
                        </DNNavItem>
                      </ProfileTabs>
                      {this.props.id && !this.props.query.uploads && !this.props.query.followers && !this.props.query.following
                      ? <div>
                          <p>{data.user.name}</p>
                          <p>{data.user.email}</p>
                        </div>
                      : null}
                      {this.props.query.uploads === data.user.name
                      ? <SongList>
                        {data.user.songs.length <= 0
                          ? <p>{data.user.name} has not uploaded any music yet.</p>
                          : <UserSongPagination id={this.props.id} name={data.user.name} page={parseFloat(this.props.query.page) || 1}>
                              {data.user.songs.map(song => {
                                return (
                                  <SongListItem onClick={() => this.routeToSong(song)} key={song.id}>
                                    <div className="art">
                                      <img src={song.image} alt={song.artist}/>
                                    </div>
                                    <div className="details">
                                      <p className="artist">{song.artist}</p>
                                      <p className="description">{song.title}</p>
                                    </div>
                                  </SongListItem>
                                );
                              })}
                            </UserSongPagination>}
                        </SongList>
                      : null}
                    </Tab>
                  </UserContainer>
                )
              }}
            </Query>
          );
        }}
      </User>
    );
  }
}

export { VIEW_USER_QUERY };
export default ViewUser;
