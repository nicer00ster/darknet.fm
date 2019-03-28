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
  Volume,
} from './controls.styles';
import { formatDuration } from '../../lib/utils';

class Controls extends Component {
  state = {
    volumeLevel: 100,
  }
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
              style={this.props.disabled ? { pointerEvents: 'none' } : null}
              onClick={this.props.rewind}>
              <i className="fal fa-fast-backward"></i>
            </Rewind>
            <Play
              disabled={this.props.disabled}
              style={this.props.disabled ? { pointerEvents: 'none' } : null}
              onClick={this.props.isPlaying ? this.props.pause : this.props.play}>{this.props.isPlaying ? <i className="fal fa-pause"></i> : <i className="fal fa-play"></i>}</Play>
            <Forward
              disabled={this.props.disabled}
              style={this.props.disabled ? { pointerEvents: 'none' } : null}
              onClick={this.props.fastForward}>
              <i className="fal fa-fast-forward"></i>
            </Forward>
          </Buttons>
          <MetaButtons>
            <Volume
              type="range"
              min="0"
              max="100"
              value={this.props.volume}
              onChange={e => this.props.adjustVolume(e.target)}
            />
            <Time>
              <span>{this.props.volume}%</span>
            </Time>
            <Heart
              disabled={this.props.disabled}
              style={this.props.disabled ? { pointerEvents: 'none' } : null}
              onClick={() => alert('liked')}>
              <i className="fal fa-heart"></i>
            </Heart>
          </MetaButtons>
        </ControlsStyles>
      </ControlContainer>
    );
  }
}

export default Controls;
