import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { Form } from '../account/styles.account';
// import TagComponent from './TagComponent';
import { ALL_SONGS_QUERY } from '../library';
import {
  TagContainer,
  TagListItem,
  TagInput,
} from './upload.styles';

const ALLOWED_TAGS = [
  "HIPHOP",
  "ROCK",
  "ELECTRONIC",
  "COUNTRY",
  "PUNK",
  "ALTERNATIVE",
  "BLUES",
  "CLASSICAL",
  "DANCE",
  "TECHNO",
  "RAP",
  "POP",
  "JAZZ",
  "SOUL",
];

const UPLOAD_SONG_MUTATION = gql`
  mutation UPLOAD_SONG_MUTATION(
    $title: String!
    $description: String!
    $image: String!
    $song: String!
    $tags: [String]
  ) {
    createSong(title: $title, description: $description, image: $image, song: $song, tags: $tags) {
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
      tags: [],
      focused: false,
      input: '',
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
    });
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
    });
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleTag = e => {
    this.setState({ input: e.target.value });
  }

  handleAddTag = e => {
    if (e.keyCode === 13 && this.state.input.length > 2) {
      const { value } = e.target;
      if(this.state.tags.includes(this.state.input) || this.state.tags.includes(this.state.input.toUpperCase())) {
        console.log('exissts');
        return;
      }
      if(ALLOWED_TAGS.includes(this.state.input) || ALLOWED_TAGS.includes(this.state.input.toUpperCase())) {
        this.setState(state => ({
          tags: [...state.tags, value.toUpperCase()],
          input: ''
        }));
      }
    }

    if (this.state.tags.length && e.keyCode === 8 && !this.state.input.length ) {
      this.setState(state => ({
        tags: state.tags.slice(0, state.tags.length - 1)
      }));
    }
  }

  handleRemoveItem = index => {
    return () => {
      this.setState(state => ({
        tags: state.tags.filter((tag, i) => i !== index)
      }));
    }
  }

  render() {
    return (
      <Mutation
        variables={{
          title: this.state.title,
          description: this.state.description,
          image: this.state.image,
          song: this.state.song,
          tags: this.state.tags,
        }}
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
                    <img src={this.state.image} alt="Preview of Image" style={{ width: '100%', paddingTop: '1rem', paddingBottom: '1rem', display: 'block', margin: '0 auto' }} />
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
                  {this.state.song && (
                    <audio src={this.state.song} controls style={{ width: '100%', padding: '1rem' }} />
                  )}
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

                <label htmlFor="tags">
                  <p>Tags</p>
                  <TagContainer>
                    <TagInput
                      value={this.state.input}
                      placeholder="Add tags to help filter your song"
                      onChange={this.handleTag}
                      onKeyDown={this.handleAddTag} />
                      {this.state.tags.map((tag, index) =>
                        <TagListItem key={index} onClick={this.handleRemoveItem(index)}>
                          #{tag}
                          <span>x</span>
                        </TagListItem>
                      )}
                      {/* {ALLOWED_TAGS.map((tag, index) => (
                        <TagListItem key={index} onClick={this.handleRemoveItem(index)}>
                          #{tag}
                          <span>x</span>
                        </TagListItem>
                      ))} */}
                  </TagContainer>
                  ?
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
