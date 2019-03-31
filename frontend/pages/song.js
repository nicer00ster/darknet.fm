import Song from '../components/song';

const SongPage = props => (
  <Song id={props.query.id} />
);

export default SongPage;
