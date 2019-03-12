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
  Time,
} from './controls.styles';
import { formatDuration } from '../../lib/utils';

class Controls extends Component {
  render() {
    return (
      <ControlContainer>
        <Seek className="seek">
          <div className="progress"></div>
          <div className="scrubber"></div>
          <Time>
            <span>{formatDuration(this.props.position)}</span>
            <span>{formatDuration(this.props.duration)}</span>
          </Time>
        </Seek>
        <ControlsStyles>
          <Buttons>
            <Rewind onClick={this.props.rewind}>⏮</Rewind>
            <Play onClick={this.props.isPlaying ? this.props.pause : this.props.play}>{this.props.isPlaying ? "||" : "▷"}</Play>
            <Forward onClick={this.props.fastForward}>⏭</Forward>
          </Buttons>
        </ControlsStyles>
      </ControlContainer>
    );
  }
}

export default Controls;
