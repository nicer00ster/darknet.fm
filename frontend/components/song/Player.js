import React, { Component } from 'react';

import Canvas from './Canvas';
import Controls from './Controls';
import Loading from '../loading';
import { PlayButton } from './song.styles';

class Player extends Component {
  constructor(props) {
    super(props);
    this.audioBuffer = React.createRef();
    this.audioContext = React.createRef();
    this.audioAnalyser = React.createRef();
    this.audioGain = React.createRef();
    this.source = React.createRef();
    this.raf = React.createRef()
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
    // this.raf = requestAnimationFrame(this.init);
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

    this.init();
    this.handleSeeker();
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
    this.source.onended = e => {
      setTimeout(() => {
        this.setState({
          isPlaying: false,
        });
      }, 500);
    }
  }

  pause = () => {
    if(this.source) {
      this.source.stop();
      this.source = null;
      this.setState({
        isPlaying: false,
        isPaused: true,
        position: this.audioContext.currentTime - this.state.startTime,
      });
    }
  }

  seek = time => {
    if(this.state.isPlaying) {
      this.play(time);
    } else {
      this.setState({
        position: time,
      });
    }
  }

  handleMouseDown = e => {
    console.log('here', e);
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
        isPlaying: true,
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

    this.scrubber.style.left = this.state.position + 'px';
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

  handleSeeker = () => {
    let progress = (this.handlePosition() / this.audioBuffer.duration);
    let width = this.seeker.offsetWidth;

    this.progress.style.width = `${progress * width}px`;
    if (!this.state.isSeeking) {
      this.scrubber.style.left = `${progress * width}px`;
    }
    requestAnimationFrame(this.handleSeeker);
  }

  componentWillUnmount() {
    this.raf = cancelAnimationFrame(this.raf);
    this.audioAnalyser.disconnect();
    this.audioGain.disconnect();
    if(this.source.current !== null) {
      this.source.disconnect();
    }
  }

  render() {
      return (
        <>
        {this.props.children}
        {this.state.isLoading
        ? <Loading />
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
            position={this.state.position}
          />
        </>
      );
  }
}

export default Player;
