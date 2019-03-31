import React, { Component } from 'react';
import { PoseGroup } from 'react-pose';
import SplitText from 'react-pose-text';

import { HomeContainer, Sidebar } from './home.styles';

const charPoses = {
  exit: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  },
  finish: {
    opacity: 0,
    y: -20,
  },
};

class Home extends Component {
  state = {
    mounted: false,
    words: [
      "DARKNET.FM",
    ],
  }
  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }
  componentWillUnmount() {
    this.setState({
      mounted: false,
    });
  }
  render() {
    return (
      <HomeContainer>
        {this.state.mounted &&
            <Sidebar initialPose="exit" pose="enter">
              {this.state.words.map((item, id) => (
                <PoseGroup key={id}>
                  <h1 key={id}>
                    <SplitText charPoses={charPoses}>{item}</SplitText>
                  </h1>
                </PoseGroup>
              ))}
          </Sidebar>}
      </HomeContainer>
    )
  }
}


export default Home;
