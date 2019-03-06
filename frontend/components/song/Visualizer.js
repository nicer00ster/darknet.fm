import React, { Component } from 'react';
import {
  PlayerContainer,
} from './song.styles';

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }
  render() {
    return (
      <PlayerContainer>
        <button onClick={this.props.play}>play</button>
        <canvas className="frequency-bars" width="624" height="100"></canvas>
      </PlayerContainer>
    );
  }
}

export default Visualizer;
