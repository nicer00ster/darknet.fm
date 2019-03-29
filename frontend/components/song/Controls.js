import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import {
  ControlContainer,
  ControlsStyles,
  Buttons,
  MetaButtons,
  Play,
  Forward,
  Rewind,
  Heart,
  Unheart,
  Bar,
  Seek,
  Time,
  Volume,
} from './controls.styles';
import User from '../user';
import Loading from '../loading';
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
            <Heart
              data-tip={`${this.props.numberOfLikes} Like${this.props.numberOfLikes === 1 ? '' : 's'}`}
              className={this.props.isSongLikedByCurrentUser ? 'liked' : null}
              disabled={this.props.disabled || this.props.unlikeSong.data.loading || this.props.likeSong.data.loading}
              style={this.props.disabled || this.props.unlikeSong.data.loading || this.props.likeSong.data.loading ? { pointerEvents: 'none' } : null}
              onClick={this.props.userId ? this.props.isSongLikedByCurrentUser ? this.props.unlikeSong.mutation : this.props.likeSong.mutation : () => alert('Log in to like songs.')}>
              <i className={this.props.isSongLikedByCurrentUser ? 'fas fa-heart fa-fill' : 'fal fa-heart'}></i>
              {this.props.unlikeSong.data.loading || this.props.likeSong.data.loading ? <Loading /> : null}
            </Heart>
            <ReactTooltip place="bottom" type="dark" effect="solid" className="tooltip" />
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
          </MetaButtons>
        </ControlsStyles>
      </ControlContainer>
    );
  }
}

export default Controls;
