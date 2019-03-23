import User from '../components/user';
import ViewUser from '../components/user/ViewUser';
import GatedLogin from '../components/account/GatedLogin';

const UserPage = props => (
  <GatedLogin>
    <ViewUser id={props.query.id} query={props.query} />
  </GatedLogin>
);

export default UserPage;
