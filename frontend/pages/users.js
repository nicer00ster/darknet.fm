import Users from '../components/users';
import GatedLogin from '../components/account/GatedLogin';

const UsersPage = () => (
  <GatedLogin>
    <Users />
  </GatedLogin>
);

export default UsersPage;
