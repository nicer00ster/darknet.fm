import Library from '../components/library';
import Pagination from '../components/pagination';

const LibraryPage = props => (
  <>
    <Pagination page={parseFloat(props.query.page) || 1} />
    <Library page={parseFloat(props.query.page) || 1} />
    <Pagination page={parseFloat(props.query.page) || 1} />
  </>
);

export default LibraryPage;
