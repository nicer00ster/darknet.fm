import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';

class Song extends Component {
  constructor() {
    super();
    this.state = {
      song: 'null',
    }
  }
  // componentDidMount() {
  //   fetch('https://s3.us-east-2.amazonaws.com/lofi-media/simple+things.mp3').then(res => res.json());
  // }
  render() {
    return (
      <p>song</p>
    );
  }
}

export default Song;
