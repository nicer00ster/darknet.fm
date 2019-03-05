import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { Form } from '../account/styles.account';
import { ALL_SONGS_QUERY } from '../library';

const UPLOAD_SONG_MUTATION = gql`
  mutation UPLOAD_SONG_MUTATION(
    $title: String!
    $description: String!
    $image: String!
    $song: String!
  ) {
    createSong(title: $title, description: $description, image: $image, song: $song) {
      id
    }
  }
`;

class Upload extends Component {
  state = {
      title: '',
      description: '',
      image: '',
      song: '',
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
    console.log(file);
    this.setState({
      image: file.secure_url,
    })
  }
  uploadSong = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'darknet.fm');
    const res = await fetch('https://api.cloudinary.com/v1_1/nicer00ster/video/upload', {
      method: 'POST',
      body: data,
    });

    const file = await res.json();
    console.log(file);
    this.setState({
      song: file.secure_url,
    })
  }
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  render() {
    return (
      <Mutation
        variables={this.state}
        refetchQueries={[
          { query: ALL_SONGS_QUERY }
        ]}
        mutation={UPLOAD_SONG_MUTATION}>
        {(createSong, { loading, error }) => {
          return (
            <Form
              data-test="form"
              onSubmit={async e => {
                e.preventDefault();
                const res = await createSong();
                console.log(res);
                Router.push({
                  pathname: '/song',
                  query: {
                    id: res.data.createSong.id
                  },
                });
              }}>
              {error && <p>{error}</p>}
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  <p>Image</p>
                  <input
                    id="file"
                    type="file"
                    name="file"
                    accept="image/*"
                    placeholder="Upload Image"
                    required
                    onChange={this.uploadImage}
                  />
                  {this.state.image && (
                    <img width="200" src={this.state.image} alt="Preview of Image"/>
                  )}
                </label>

                <label htmlFor="file">
                  <p>Song</p>
                  <input
                    id="file"
                    type="file"
                    name="file"
                    accept="audio/*"
                    placeholder="Upload Song"
                    required
                    onChange={this.uploadSong}
                  />
                </label>

                <label htmlFor="title">
                  <p>Title</p>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>

                <label htmlFor="description">
                  <p>Description</p>
                  <input
                    id="description"
                    name="description"
                    placeholder="Enter A Description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>

                <button type="submit">Upload</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    );
  }
}

export { UPLOAD_SONG_MUTATION };
export default Upload;
