import React, { Component } from 'react';

import Canvas from './Canvas';
import Controls from './Controls';
import Loading from '../loading';
import { PlayButton, PlayerContainer } from './song.styles';

class Player extends Component {
  constructor(props) {
    super(props);
    this.audioBuffer = React.createRef();
    this.audioContext = React.createRef();
    this.audioAnalyser = React.createRef();
    this.audioGain = React.createRef();
    this.source = React.createRef();
    this.raf = React.createRef()
    this.rafSeek = React.createRef();
    this.scrubber = React.createRef();
    this.seeker = React.createRef();
    this.progress = React.createRef();

    this.state = {
      audioData: new Uint8Array(0),
      frequencyBinCount: 0,
      isPlaying: false,
      isPaused: false,
      playedAt: Date.now(),
      pausedAt: null,
      isLoading: true,
      isSeeking: false,
      seekStart: 0,
      seekLeft: 0,
      position: 0,
      startTime: 0,
      progress: 0,
    }
  }

  componentDidMount() {
    this.scrubber = document.querySelector('.scrubber');
    this.seeker = document.querySelector('.seek');
    this.progress = document.querySelector('.progress');
    this.audioContext = new AudioContext();
    this.audioAnalyser = this.audioContext.createAnalyser();
    this.audioGain = this.audioContext.createGain();
    this.scrubber.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mousemove', this.handleDrag);
    window.addEventListener('mouseup', this.handleMouseUp);

    fetch(this.props.audio)
      .then(res => res.arrayBuffer())
      .then(buffer => this.audioContext.decodeAudioData(buffer))
      .then(audioBuffer => {
        this.audioBuffer = audioBuffer;
      })
      .then(() => {
        this.setState({
          isLoading: false,
        });
    });

    this.handleSeeker();
    this.init();
  }

  init = () => {
    let frequencyData = new Uint8Array(this.audioAnalyser.frequencyBinCount);
    this.audioAnalyser.getByteFrequencyData(frequencyData);
    this.raf = requestAnimationFrame(this.init);
    this.setState({
      audioData: frequencyData,
      frequencyBinCount: this.audioAnalyser.frequencyBinCount,
    });
  }

  connect = () => {
    if (this.state.isPlaying) {
      this.pause();
    }
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.connect(this.audioContext.destination);
    this.source.connect(this.audioGain);
    this.source.connect(this.audioAnalyser)
    this.audioGain.connect(this.audioContext.destination);
  }

  play = (time) => {
    this.connect();
    this.setState({
      isPlaying: true,
      isPaused: false,
      position: typeof time === 'number' ? time : this.state.position || 0,
      startTime: this.audioContext.currentTime - (this.state.position || 0),
    });
    this.source.start(this.audioContext.currentTime, this.state.position);
    // this.source.onended = e => {
    //   console.log(this.source);
    //   setTimeout(() => {
    //     this.setState({
    //       isPlaying: false,
    //     });
    //   }, 500);
    // }
  }

  pause = () => {
    if(this.source && this.source.current !== null) {
      this.source.stop();
      this.source = null;
      this.setState({
        isPlaying: false,
        isPaused: true,
        position: this.audioContext.currentTime - this.state.startTime,
      });
    }
  }

  mute = () => {
    console.log(this.audioGain);
    this.audioGain.gain.setValueAtTime(0, this.audioContext.currentTime);
  }

  seek = time => {
    if(this.state.isPlaying) {
      this.setState({
        position: time,
      }, () => {
        this.play(time);
      });
    } else {
      this.setState({
        position: time,
      });
    }
  }

  handleMouseDown = e => {
    this.pause();
    this.setState({
      isSeeking: true,
      seekStart: e.pageX,
      seekLeft: parseInt(this.scrubber.style.left || 0, 10),
    });
  }

  handleMouseUp = e => {
    let width;
    let left;
    let time;

    if(this.state.isSeeking) {
      width = this.seeker.offsetWidth;
      left = parseInt(this.scrubber.style.left || 0, 10);
      time = left / width * this.audioBuffer.duration;
      this.setState({
        isSeeking: false,
        isPlaying: false,
        isPaused: false,
      });
      this.seek(time);
    }
  }

  handleDrag = e => {
    if(!this.state.isSeeking) return;

    const width = this.seeker.offsetWidth;
    let position = this.state.seekLeft + (e.pageX - this.state.seekStart);
    position = Math.max(Math.min(width, position), 0);

    this.setState({
      position: position,
    });

    this.scrubber.style.left = position + 'px';
  }

  handlePosition = () => {
    this.setState({
      position: this.state.isPlaying ? this.audioContext.currentTime - this.state.startTime : this.state.position,
    });
    if (this.state.position >= this.audioBuffer.duration) {
      this.setState({
        position: this.audioBuffer.duration,
      });
      this.pause();
    }
    return this.state.position;
  };

  fastForward = () => {
    if(this.state.isPlaying) {
      this.pause();
    }
    this.setState({
      position: (this.state.position / 6) + this.state.position,
    }, () => {
      this.play();
    });
  }

  rewind = () => {
    if(this.state.isPlaying) {
      this.pause();
    }
    this.setState({
      position: this.state.position - (this.state.position / 6),
    }, () => {
      this.play();
    })
  }

  handleSeeker = () => {
    this.rafSeek = requestAnimationFrame(this.handleSeeker);
    let progress = (this.handlePosition() / this.audioBuffer.duration);
    let width = this.seeker.offsetWidth;


    if (!this.state.isSeeking) {
      this.progress.style.width = `${progress * width}px`;
      this.scrubber.style.left = `${progress * width}px`;
    }
  }

  componentWillUnmount() {
    this.raf = cancelAnimationFrame(this.raf);
    this.rafSeek = cancelAnimationFrame(this.rafSeek);
    this.audioAnalyser.disconnect();
    this.audioGain.disconnect();
    this.scrubber.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    return (
      <>
      {this.props.children}
      {this.state.isLoading
      ? <PlayerContainer>
          <Loading />
        </PlayerContainer>
      : <Canvas
          play={this.play}
          audioData={this.state.audioData}
          frequencyBinCount={this.state.frequencyBinCount}
          isPlaying={this.state.isPlaying}
        />}
        <Controls
          isPlaying={this.state.isPlaying}
          play={this.play}
          pause={this.pause}
          seek={this.seek}
          mute={this.mute}
          fastForward={this.fastForward}
          rewind={this.rewind}
          position={this.state.position}
          duration={this.audioBuffer.duration}
          disabled={this.state.isLoading}
        />
      </>
    );
  }
}

export default Player;
