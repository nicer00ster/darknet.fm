import GatedLogin from '../components/account/GatedLogin';
import Permissions from '../components/permissions';

const PermissionsPage = props => (
  <GatedLogin>
    <Permissions />
  </GatedLogin>
);

export default PermissionsPage;
