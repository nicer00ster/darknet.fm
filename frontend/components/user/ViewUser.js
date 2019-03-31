import React, { Component } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import Loading from '../loading';
import User from './index';
import Avatar from '../users/Avatar';
import { userPerPage } from '../../config';
import { Composed } from '../users';
import {
  UserContainer,
  PhotoContainer,
  UserPhoto,
  ProfileTabs,
  Tab,
  AvatarForm,
  DetailsList,
  DetailsListItem,
  Overview,
} from './user.styles';
import {
  SongList,
  SongListItem,
  SongImage,
} from '../library/library.styles';
import {
  UserList,
  UserListItem,
} from '../users/users.styles';
import { DNNavItem } from '../header/header.styles';
import {
  UserSongPagination,
  UserFollowerPagination,
  UserFollowingPagination,
  UserLikesPagination,
} from '../pagination';
import { CURRENT_USER_QUERY } from './index';

const VIEW_USER_QUERY = gql`
  query VIEW_USER_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${userPerPage}) {
    user(where: {
      id: $id
    }) {
      id
      name
      email
      avatar
      likedSongs {
        id
        image
        artist
        title
      }
      followers(first: $first, skip: $skip, orderBy: createdAt_DESC) {
        id
        name
        email
        avatar
        songs {
          id
        }
        followers {
          id
          name
        }
      }
      following(first: $first, skip: $skip, orderBy: createdAt_DESC) {
        id
        name
        email
        avatar
        songs {
          id
        }
        followers {
          id
          name
        }
      }
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
    uploadAvatar(avatar: $avatar, email: $email, where: {
      email: $email
    }) {
      avatar
    }
  }
`;

class ViewUser extends Component {
  state = {
    avatar: "",
    uploadingAvatar: false,
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
    this.setState({ uploadingAvatar: true });

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
      uploadingAvatar: false,
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
                        refetchQueries={[
                          { query: CURRENT_USER_QUERY }
                        ]}
                        variables={{
                          email: data.user.email,
                          avatar: this.state.avatar,
                      }}>
                        {(uploadAvatar, { error, loading }) => {
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
                                this.setState({
                                  avatar: ""
                                });
                              }}>
                              <fieldset
                                style={loading || this.state.uploadingAvatar ? { pointerEvents: 'none', opacity: 0.25 } : null}
                                disabled={loading || this.state.uploadingAvatar}
                                aria-busy={loading || this.state.uploadingAvatar}>
                                  <UserPhoto
                                    onClick={() => document.querySelector("#file").click()}
                                    src={this.state.avatar ? this.state.avatar : data.user.avatar}>
                                    {loading || this.state.uploadingAvatar ? <Loading /> : null}
                                  </UserPhoto>
                                  <div className="uploadAvatar" style={this.state.avatar.length > 0 ? { transform: 'translateY(0px)' } : null}>
                                    <input
                                      id="file"
                                      type="file"
                                      name="file"
                                      accept="image/*"
                                      placeholder="Upload Image"
                                      required
                                      onChange={this.uploadImage}
                                    />
                                    <button
                                      data-button
                                      type="submit"
                                      style={this.state.avatar.length > 0 ? { opacity: 1 } : null}>
                                      Upload
                                    </button>
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
                        {/* <DetailsListItem>
                          <i className="fal fa-map-marker-alt fa-2x"></i>
                          <div>Philadelphia, PA</div>
                        </DetailsListItem> */}
                        <DetailsListItem>
                          <i className="fal fa-envelope fa-2x"></i>
                          <div>{data.user.email}</div>
                        </DetailsListItem>
                      </DetailsList>
                    </PhotoContainer>
                    <Tab>
                      <ProfileTabs>
                        <DNNavItem>
                          <Link prefetch scroll={false} href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                            }
                          }}>
                            <a>Overview</a>
                          </Link>
                        </DNNavItem>
                        <DNNavItem>
                          <Link prefetch scroll={false} href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                              uploads: data.user.name,
                              page: 1,
                            }
                          }}>
                            <a>Uploads</a>
                          </Link>
                        </DNNavItem>
                        <DNNavItem>
                          <Link prefetch scroll={false} href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                              followers: data.user.name,
                              page: 1,
                            }
                          }}>
                            <a>Followers</a>
                          </Link>
                        </DNNavItem>
                        <DNNavItem>
                          <Link prefetch scroll={false} href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                              following: data.user.name
                            }
                          }}>
                            <a>Following</a>
                          </Link>
                        </DNNavItem>
                        <DNNavItem>
                          <Link prefetch scroll={false} href={{
                            pathname: 'user',
                            query: {
                              id: this.props.id,
                              likes: data.user.name,
                              page: 1,
                            }
                          }}>
                            <a>Likes</a>
                          </Link>
                        </DNNavItem>
                      </ProfileTabs>
                      {this.props.id && !this.props.query.uploads && !this.props.query.followers && !this.props.query.following && !this.props.query.likes
                      ? <Overview>
                          <p>Username: {data.user.name}</p>
                          <p>Email: {data.user.email}</p>
                          <div data-tip={`${data.user.followers.length} follower${data.user.followers.length === 1 ? '' : 's'}`}><i className="fal fa-users"></i>{data.user.followers.length}</div>
                          <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                          <div data-tip={`${data.user.songs.length} upload${data.user.songs.length === 1 ? '' : 's'}`}><i className="fal fa-cloud-upload"></i>{data.user.songs.length}</div>
                          <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                        </Overview>
                      : null}
                      {this.props.query.uploads === data.user.name
                      ? <SongList>
                        {data.user.songs.length <= 0
                          ? <p>{data.user.name} has not uploaded any music yet.</p>
                          : <UserSongPagination id={this.props.id} name={data.user.name} page={parseFloat(this.props.query.page) || 1}>
                              {data.user.songs.map(song => {
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
                            </UserSongPagination>}
                        </SongList>
                      : null}
                      {this.props.query.followers === data.user.name
                        ? <UserList>
                            {data.user.followers.length <= 0
                              ? <p>{data.user.name} has no followers.</p>
                              : <UserFollowerPagination id={this.props.id} name={data.user.name} page={parseFloat(this.props.query.page) || 1}>
                                  {data.user.followers.map(follower => {
                                    return (
                                      <UserListItem key={follower.id}>
                                        <Avatar
                                          avatar={follower.avatar}
                                          style={{ width: 65, height: 65 }}
                                          onClick={() => Router.push({
                                          pathname: '/user',
                                          query: {
                                            id: follower.id,
                                          },
                                        })} />
                                        <p onClick={() => Router.push({
                                          pathname: '/user',
                                          query: {
                                            id: follower.id,
                                          },
                                        })}>{follower.name}</p>
                                        <Composed email={follower.email} id={follower.id}>
                                          {({ followUser, unfollowUser }) => {
                                            if(currentUser && follower.followers.some(user => user.id === currentUser.id)) {
                                              return (
                                                <>
                                                <span>
                                                  <div data-tip={`${follower.followers.length} follower${follower.followers.length === 1 ? '' : 's'}`}><i className="fal fa-users"></i>{follower.followers.length}</div>
                                                  <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                                                  <div data-tip={`${follower.songs.length} upload${follower.songs.length === 1 ? '' : 's'}`}><i className="fal fa-cloud-upload"></i>{follower.songs.length}</div>
                                                  <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                                                </span>
                                                <button
                                                  data-button
                                                  disabled={unfollowUser.data.loading}
                                                  aria-disabled={unfollowUser.data.loading}
                                                  className="unfollow"
                                                  onClick={unfollowUser.mutation}>
                                                  Unfollow
                                                  {unfollowUser.data.loading ? <Loading /> : null}
                                                </button>
                                                </>
                                              );
                                            } else {
                                              return (
                                                <>
                                                <span>
                                                  <div data-tip={`${follower.followers.length} follower${follower.followers.length === 1 ? '' : 's'}`}><i className="fal fa-users"></i>{follower.followers.length}</div>
                                                  <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                                                  <div data-tip={`${follower.songs.length} upload${follower.songs.length === 1 ? '' : 's'}`}><i className="fal fa-cloud-upload"></i>{follower.songs.length}</div>
                                                  <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                                                </span>
                                                {currentUser && follower.id === currentUser.id
                                                  ? null
                                                  : <button
                                                      data-button
                                                      disabled={followUser.data.loading}
                                                      aria-disabled={followUser.data.loading}
                                                      onClick={followUser.mutation}>
                                                      Follow
                                                      {followUser.data.loading ? <Loading /> : null}
                                                    </button>}
                                                </>
                                              );
                                            }
                                          }}
                                        </Composed>
                                      </UserListItem>
                                    );
                                  })}
                                </UserFollowerPagination>}
                          </UserList>
                        : null}
                        {this.props.query.following === data.user.name
                          ? <UserList>
                            {data.user.following.length <= 0
                              ? <p>{data.user.name} is not following anyone.</p>
                              : <UserFollowingPagination id={this.props.id} name={data.user.name} page={parseFloat(this.props.query.page) || 1}>
                                  {data.user.following.map(following => {
                                    return (
                                      <UserListItem key={following.id}>
                                        <Avatar
                                          avatar={following.avatar}
                                          style={{ width: 65, height: 65 }}
                                          onClick={() => Router.push({
                                          pathname: '/user',
                                          query: {
                                            id: following.id,
                                          },
                                        })} />
                                        <p onClick={() => Router.push({
                                          pathname: '/user',
                                          query: {
                                            id: following.id,
                                          },
                                        })}>{following.name}</p>
                                        <Composed email={following.email} id={following.id}>
                                          {({ followUser, unfollowUser }) => {
                                            if(currentUser && following.followers.some(user => user.id === currentUser.id)) {
                                              return (
                                                <>
                                                <span>
                                                  <div data-tip={`${following.followers.length} follower${following.followers.length === 1 ? '' : 's'}`}><i className="fal fa-users"></i>{following.followers.length}</div>
                                                  <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                                                  <div data-tip={`${following.songs.length} upload${following.songs.length === 1 ? '' : 's'}`}><i className="fal fa-cloud-upload"></i>{following.songs.length}</div>
                                                  <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                                                </span>
                                                <button
                                                  data-button
                                                  disabled={unfollowUser.data.loading}
                                                  aria-disabled={unfollowUser.data.loading}
                                                  className="unfollow"
                                                  onClick={unfollowUser.mutation}>
                                                  Unfollow
                                                  {unfollowUser.data.loading ? <Loading /> : null}
                                                </button>
                                                </>
                                              );
                                            } else {
                                              return (
                                                <>
                                                <span>
                                                  <div data-tip={`${following.followers.length} follower${following.followers.length === 1 ? '' : 's'}`}><i className="fal fa-users"></i>{following.followers.length}</div>
                                                  <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                                                  <div data-tip={`${following.songs.length} upload${following.songs.length === 1 ? '' : 's'}`}><i className="fal fa-cloud-upload"></i>{following.songs.length}</div>
                                                  <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip"/>
                                                </span>
                                                {currentUser && following.id === currentUser.id
                                                  ? null
                                                  : <button
                                                      data-button
                                                      disabled={followUser.data.loading}
                                                      aria-disabled={followUser.data.loading}
                                                      onClick={followUser.mutation}>
                                                      Follow
                                                      {followUser.data.loading ? <Loading /> : null}
                                                    </button>}
                                                </>
                                              );
                                            }
                                          }}
                                        </Composed>
                                      </UserListItem>
                                    );
                                  })}
                                </UserFollowingPagination>}
                            </UserList>
                          : null}
                      {this.props.query.likes === data.user.name
                      ? <SongList>
                        {data.user.likedSongs.length <= 0
                        ? <p>{data.user.name} has not liked any songs yet.</p>
                        : <UserLikesPagination id={this.props.id} name={data.user.name} page={parseFloat(this.props.query.page) || 1}>
                            {data.user.likedSongs.map(song => {
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
                          </UserLikesPagination>}
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
