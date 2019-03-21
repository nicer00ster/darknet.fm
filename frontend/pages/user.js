import User from '../components/user';
import ViewUser from '../components/user/ViewUser';

const UserPage = props => (
  <ViewUser id={props.query.id} query={props.query} />
);

export default UserPage;
