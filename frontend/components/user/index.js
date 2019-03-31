import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      email
      name
      permissions
      avatar
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export { CURRENT_USER_QUERY };
export default User;
