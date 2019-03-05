import Users from '../components/users';

const UserPage = props => (
  <div>
    <p>hey {props.query.name}</p>
  </div>
);

export default UserPage;
