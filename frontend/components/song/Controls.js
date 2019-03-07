import React, { Component } from 'react';

import {
  ControlContainer,
  ControlsStyles,
  Buttons,
  Play,
  Forward,
  Rewind,
  Bar,
  Seek,
} from './controls.styles';

class Controls extends Component {
  render() {
    return (
      <ControlContainer>
        <Seek className="seek">
          <div className="progress"></div>
          <div className="scrubber"></div>
        </Seek>
        <ControlsStyles>
          <Buttons>
            {this.props.position}
            <Rewind>⏮</Rewind>
            <Play onClick={this.props.isPlaying ? this.props.pause : this.props.play}>{this.props.isPlaying ? "||" : "▷"}</Play>
            <Forward>⏭</Forward>
          </Buttons>
        </ControlsStyles>
      </ControlContainer>
    );
  }
}

export default Controls;
