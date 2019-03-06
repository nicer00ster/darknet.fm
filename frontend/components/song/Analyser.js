import React, { Component } from 'react';
import Visualizer from './Visualizer';

class Analyser extends Component {
  constructor(props) {
    super(props);
    this.audioBuffer = React.createRef();
    this.audioContext = React.createRef();
    this.audioAnalyser = React.createRef();
    this.audioGain = React.createRef();
    this.state = {
      audioData: null,
    }
  }

  componentDidMount() {
    this.audioContext = new AudioContext();
    this.audioAnalyser = this.audioContext.createAnalyser();
    this.audioGain = this.audioContext.createGain();

    fetch(this.props.audio)
      .then(res => res.arrayBuffer())
      .then(buffer => this.audioContext.decodeAudioData(buffer))
      .then(audioBuffer => {
        console.log(audioBuffer);
        this.audioBuffer = audioBuffer;
      })
      // .then(() => {
        // this.drawVisualiser();
      // });
  }

  drawVisualiser = () => {
    const frequencyBars = document.querySelector('.frequency-bars');
    const frequencyContext = frequencyBars.getContext("2d");
    this.audioAnalyser.fftSize = 1024;
    let frequencyDataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
    // get equalizer data
    this.audioAnalyser.getByteFrequencyData(frequencyDataArray);
    requestAnimationFrame(this.drawVisualiser);

    // canvas config
    frequencyContext.fillStyle = "#1f222e";
    frequencyContext.shadowColor = '#1f222e';
    frequencyContext.shadowBlur = 4;
    frequencyContext.fillRect(0, 0, frequencyBars.width, frequencyBars.height);
    frequencyContext.beginPath();

    // draw frequency - bar
    const barWidth = (frequencyBars.width / this.audioAnalyser.frequencyBinCount) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < this.audioAnalyser.frequencyBinCount; i++) {
     barHeight = frequencyDataArray[i];

     frequencyContext.fillStyle = "#fefefe";
     frequencyContext.fillRect(x, frequencyBars.height - barHeight / 3, barWidth, barHeight / 2);

     x += barWidth + 1;
    }
  }

  // // start play
  // let startedAt = Date.now();
  // let pausedAt = null;
  // source.start();
  //
  // // stop play
  // source.stop();
  // pausedAt = Date.now() - startedAt;
  //
  // // resume from where we stop
  // source.start();
  // startedAt = Date.now() - pausedAt;
  // source.start(0, audionState.pausedAt / 1000);

  play = () => {
    let source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    console.log(source);
    source.connect(this.audioContext.destination);
    source.connect(this.audioGain);
    this.audioGain.connect(this.audioContext.destination);
    source.connect(this.audioAnalyser);
    source.start();
    this.drawVisualiser();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.audioAnalyser.disconnect();
    // this.source.disconnect();
  }

  render() {
    return (
      <div>
        <Visualizer play={this.play} />
      </div>
    );
  }
}

export default Analyser;
