import Link from 'next/link';

import Song from '../components/song';

const Index = props => (
  <div>
    <h1>DARKNET.FM {props.song}</h1>
    <Song />
  </div>
);

export default Index;
