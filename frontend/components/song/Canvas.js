import React, { Component } from 'react';
import {
  PlayerContainer,
} from './song.styles';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if(this.props.isPlaying) {
      this.drawVisualiser();
    }
  }
  drawVisualiser = () => {
    const context = this.canvas.getContext("2d");

    context.fillStyle = "#1f222e";
    context.shadowColor = "#fefefe";
    context.shadowBlur = 12;
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    context.beginPath();

    const barWidth = (this.canvas.width / this.props.frequencyBinCount) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < this.props.frequencyBinCount; i++) {
     barHeight = this.props.audioData[i];

     context.fillStyle = "#fefefe";
     context.fillRect(x, this.canvas.height - barHeight / 3, barWidth, barHeight / 2);

     x += barWidth + 1;
    }
  }
  componentWillUnmount() {
    const context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas = null;
  }
  render() {
    return (
      <PlayerContainer>
        <canvas className="frequency-bars" width="624" height="124" ref={canvas => this.canvas = canvas}></canvas>
      </PlayerContainer>
    );
  }
}

export default Canvas;
