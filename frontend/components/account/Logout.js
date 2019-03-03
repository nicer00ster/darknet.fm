import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../user';
import { DNNavItem } from '../header/header.styles';

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout {
      message
    }
  }
`;

const Logout = props => (
  <Mutation
    refetchQueries={[
      { query: CURRENT_USER_QUERY }
    ]}
    mutation={LOGOUT_MUTATION}>
    {logout => {
      return (
        <DNNavItem>
          <a onClick={logout}>Logout</a>
        </DNNavItem>
      );
    }}
  </Mutation>
);

export default Logout;
