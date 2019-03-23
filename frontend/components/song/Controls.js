import React, { Component } from 'react';

import {
  ControlContainer,
  ControlsStyles,
  Buttons,
  MetaButtons,
  Play,
  Forward,
  Rewind,
  Heart,
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
            <Rewind
              disabled={this.props.disabled}
              onClick={this.props.rewind}>
              <i className="fal fa-fast-backward"></i>
            </Rewind>
            <Play
              disabled={this.props.disabled}
              onClick={this.props.isPlaying ? this.props.pause : this.props.play}>{this.props.isPlaying ? <i className="fal fa-pause"></i> : <i className="fal fa-play"></i>}</Play>
            <Forward
              disabled={this.props.disabled}
              onClick={this.props.fastForward}>
              <i className="fal fa-fast-forward"></i>
            </Forward>
          </Buttons>
          <MetaButtons>
            <Heart>
              <i className="fal fa-heart"></i>
            </Heart>
          </MetaButtons>
        </ControlsStyles>
      </ControlContainer>
    );
  }
}

export default Controls;
