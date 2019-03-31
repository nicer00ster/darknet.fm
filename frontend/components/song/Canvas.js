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
      document.addEventListener('resize', this.drawVisualiser);
    }
  }
  drawVisualiser = () => {
    const context = this.canvas.getContext("2d");

    this.canvas.width = document.querySelector('.seek').offsetWidth;
    this.canvas.style.width = document.querySelector('.seek').offsetWidth;

    context.fillStyle = 'transparent';

    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    context.beginPath();

    const barWidth = (this.canvas.width / this.props.frequencyBinCount) * 4.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < this.props.frequencyBinCount; i++) {
     barHeight = this.props.audioData[i];

     context.fillStyle = '#1f222e';
     context.fillRect(x, this.canvas.height - barHeight / 4, barWidth, barHeight / 3);

     x += barWidth + 1;
    }
  }
  componentWillUnmount() {
    const context = this.canvas.getContext("2d");
    document.removeEventListener('resize', this.drawVisualiser);
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas = null;
  }
  render() {
    return (
      <PlayerContainer>
        <canvas className="frequency-bars" height="96" ref={canvas => this.canvas = canvas}></canvas>
      </PlayerContainer>
    );
  }
}

export default Canvas;
