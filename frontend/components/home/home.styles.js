import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

const Sidebar = posed.div({
  exit: {
    x: '-100%'
  },
  enter: {
    x: '0%',
    beforeChildren: true,
    staggerChildren: 100
  },
});

const HomeContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export {
  HomeContainer,
  Sidebar,
};
