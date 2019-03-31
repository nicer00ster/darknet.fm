import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Downshift, { resetIdCounter } from 'downshift';
import debounce from 'lodash.debounce';
import { withToast } from 'react-awesome-toasts';

import { Form } from '../account/account.styles';
import Loading from '../loading';
import { DNInput } from '../layout/layout.styles';
import {
  TagContainer,
  TagListItem,
  TagInput,
  InputContainer,
} from './upload.styles';
import {
  DropDown,
  DropDownItem,
} from '../search/search.styles';
import { ALL_SONGS_QUERY } from '../library';
import { ALL_USERS_QUERY } from '../users';

const UPLOAD_SONG_MUTATION = gql`
  mutation UPLOAD_SONG_MUTATION(
    $artist: String!
    $title: String!
    $description: String!
    $image: String!
    $song: String!
    $tags: [String]
  ) {
    createSong(artist: $artist, title: $title, description: $description, image: $image, song: $song, tags: $tags) {
      id
    }
  }
`;

const QUERY_TAGS = gql`
  query {
    __type(name: "Tag") {
      name
      enumValues {
        name
      }
    }
  }
`;

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      title: '',
      description: '',
      image: '',
      song: '',
      tags: [],
      allowedTags: [],
      input: '',
      selected: '',
      uploadingSong: false,
      uploadingImage: false,
    }
    this.form = React.createRef();
  }

  uploadImage = async e => {
    this.setState({
      uploadingImage: true,
    });

    const files = e.target.files;
    const data = new FormData();
    // Allowed types
    const mimeTypes = ['image/jpeg', 'image/png'];

    // Validate MIME type
    if(mimeTypes.indexOf(files[0].type) == -1) {
      this.props.toastManager.add("Invalid file type. Supported files are .jpeg or .png file.", {
        appearance: 'error',
        autoDismiss: true,
      });
      this.setState({
        uploadingImage: false,
      });
      return;
    } else {
      data.append('file', files[0]);
      data.append('upload_preset', 'darknet.fm');
      const res = await fetch('https://api.cloudinary.com/v1_1/nicer00ster/image/upload', {
        method: 'POST',
        body: data,
      });

      const file = await res.json();

      this.setState({
        image: file.secure_url,
        uploadingImage: false,
      });
    }
  }

  uploadSong = async e => {
    this.setState({
      uploadingSong: true,
    });

    const files = e.target.files;
    const data = new FormData();
    const mimeTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/mp3'];

    if(mimeTypes.indexOf(files[0].type) == -1) {
      this.props.toast.show({
        text: 'Invalid file type. Supported files are .mp3, .mp4, .mpg/.mpeg, or .wav file.',
        ariaLabel: 'Invalid file type.',
        variant: 'error',
        actionText: 'Okay',
        onActionClick: this.props.toast.hide,
      });
      this.setState({
        uploadingSong: false,
      });
      return;
    } else {
      data.append('file', files[0]);
      data.append('upload_preset', 'darknet.fm');
      const res = await fetch('https://api.cloudinary.com/v1_1/nicer00ster/video/upload', {
        method: 'POST',
        body: data,
      });

      const file = await res.json();

      this.setState({
        song: file.secure_url,
        uploadingSong: false,
      });
    }
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleTag = debounce(async (e, client) => {
    this.setState({ loading: true });
    let tags = [];

    const res = await client.query({
      query: QUERY_TAGS,
      variables: {
        input: e.target.value
      },
    });

    res.data.__type.enumValues.map(tag => {
      if(tag.name.indexOf(e.target.value.toUpperCase()) > -1) {
        return tags.push(tag.name);
      }
    });

    this.setState({
      allowedTags: tags,
      loading: false,
    });
  }, 350);

  handleAddTag = (e, tag) => {
    if(this.state.tags.includes(tag) || this.state.tags.includes(tag.toUpperCase())) {
      return;
    }
    if(this.state.allowedTags.includes(tag) || this.state.allowedTags.includes(tag.toUpperCase())) {
      this.setState(state => ({
        tags: [...state.tags, tag.toUpperCase()],
        input: ''
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
    resetIdCounter();
    return (
      <Mutation
        variables={{
          artist: this.state.artist,
          title: this.state.title,
          description: this.state.description,
          image: this.state.image,
          song: this.state.song,
          tags: this.state.tags,
        }}
        refetchQueries={[
          { query: ALL_SONGS_QUERY },
          { query: ALL_USERS_QUERY },
        ]}
        mutation={UPLOAD_SONG_MUTATION}>
        {(createSong, { loading, error }) => {
          return (
            <Form
              data-test="form"
              ref={form => this.form = form}
              onSubmit={async e => {
                e.preventDefault();
                if(error) {
                  this.props.toast.show({
                    text: error.message,
                    ariaLabel: 'Invalid file type.',
                    variant: 'error',
                    actionText: 'Okay',
                    onActionClick: this.props.toast.hide,
                  });
                }
                const res = await createSong();
                Router.push({
                  pathname: '/song',
                  query: {
                    id: res.data.createSong.id
                  },
                });
              }}>
              <fieldset
                disabled={loading || this.state.uploadingSong || this.state.uploadingImage}
                aria-busy={loading || this.state.uploadingSong || this.state.uploadingImage}>
                {this.state.uploadingSong || this.state.uploadingImage ? <Loading /> : null}
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

                <InputContainer>
                  <DNInput>
                    <input
                      type="text"
                      id="artist"
                      name="artist"
                      required
                      value={this.state.artist}
                      onChange={this.handleChange}
                    />
                    <span className="bar"></span>
                    <span className="highlight"></span>
                    <label htmlFor="artist">
                      Artist
                    </label>
                  </DNInput>

                  <DNInput>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                    <span className="bar"></span>
                    <span className="highlight"></span>
                    <label htmlFor="title">
                      Title
                    </label>
                  </DNInput>
                </InputContainer>

                <DNInput>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                  <span className="bar"></span>
                  <span className="highlight"></span>
                  <label htmlFor="description">
                    Description
                  </label>
                </DNInput>

                <label htmlFor="tags">
                  <p>Tags</p>
                  <Downshift itemToString={item => (item ? item : '')}>
                    {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
                      <div style={{ position: 'relative' }}>
                        <ApolloConsumer>
                          {client => {
                            return (
                              <TagContainer>
                                <TagInput
                                  {...getInputProps({
                                    type: 'search',
                                    name: 'input',
                                    id: 'tag',
                                    required: true,
                                    onChange: e => {
                                      e.persist();
                                      this.setState({ input: e.target.value });
                                      this.handleTag(e, client);
                                    },
                                    onKeyDown: e => {
                                      if(e.key === 'Enter') {
                                        this.handleAddTag(e, inputValue);
                                      }
                                    },
                                  })} />
                                  {this.state.tags.map((tag, index) =>
                                    <TagListItem key={index} onClick={this.handleRemoveItem(index)}>
                                      #{tag}
                                      <span>x</span>
                                    </TagListItem>
                                  )}
                                  {this.state.loading && (
                                    <Loading />
                                  )}
                              </TagContainer>
                            );
                          }}
                        </ApolloConsumer>
                        {isOpen && (
                          <DropDown>
                            {this.state.allowedTags.map((tag, index) => (
                              <DropDownItem
                                {...getItemProps({ item: tag })}
                                key={index}
                                onClick={e => this.handleAddTag(e, tag)}
                                highlighted={index === highlightedIndex}>
                                <span>{tag}</span>
                              </DropDownItem>
                            ))}
                            {!this.state.allowedTags.length && !this.state.loading && (
                              <DropDownItem>
                                Nothing found for {inputValue}
                              </DropDownItem>
                            )}
                          </DropDown>
                        )}
                      </div>
                    )}
                  </Downshift>
                </label>

                <button type="button" data-button onClick={e => this.form.props.onSubmit(e)}>Upload</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    );
  }
}

export { UPLOAD_SONG_MUTATION, QUERY_TAGS };
export default withToast(Upload);
