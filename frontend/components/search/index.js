import React, { Component } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';

import Loading from '../loading';
import { DropDown, DropDownItem, SearchStyles } from './search.styles';

const SEARCH_SONGS_QUERY = gql`
  query SEARCH_SONGS_QUERY($input: String!) {
    songs(where: {
      OR: [
        { title_contains: $input },
        { description_contains: $input }
      ]
    }) {
      id
      image
      title
    }
  }
`;

class Search extends Component {
  state = {
    songs: [],
    loading: false,
  }
  handleInput = debounce(async (e, client) => {
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_SONGS_QUERY,
      variables: {
        input: e.target.value
      },
    });
    console.log(res);
    this.setState({
      songs: res.data.songs,
      loading: false,
    });
  }, 350);
  routeToSong = (song, e) => {
    Router.push({
      pathname: '/song',
      query: {
        id: song.id,
      },
    });
  }
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift onChange={this.routeToSong} itemToString={song => (song === null ? '' : song.title)}>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => {
                  return (
                    <>
                    <input
                      {...getInputProps({
                        type: 'search',
                        id: 'search',
                        required: true,
                        onChange: e => {
                          e.persist();
                          this.handleInput(e, client);
                        },
                      })} />
                      <span className="bar"></span>
                      <span className="highlight"></span>
                      <label>
                        <i className="fal fa-search"></i>
                        Search
                      </label>
                      {this.state.loading && (
                        <Loading />
                      )}
                    </>
                    )
                  }}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.songs.map((song, index) => (
                    <DropDownItem
                      {...getItemProps({ item: song })}
                      key={song.id}
                      highlighted={index === highlightedIndex}>
                      <img width="50" src={song.image} alt={song.title} />
                      <span>{song.title}</span>
                    </DropDownItem>
                  ))}
                  {!this.state.songs.length && !this.state.loading && (
                    <DropDownItem>
                      Nothing found for {inputValue}
                    </DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default Search;
