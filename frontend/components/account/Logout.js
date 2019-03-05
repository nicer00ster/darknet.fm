import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from '../user';
import Loading from '../loading';
import { DNNavItem } from '../header/header.styles';

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout {
      message
    }
  }
`;

const isLoading = {
  'pointer-events': 'none',
  'cursor': 'default',
};

const Logout = props => (
  <Mutation
    refetchQueries={[
      { query: CURRENT_USER_QUERY }
    ]}
    mutation={LOGOUT_MUTATION}>
    {(logout, { loading }) => {
      return (
        <DNNavItem style={loading ? isLoading : null}>
          <a style={loading ? { color: 'rgba(0,0,0,.25)' } : null} onClick={logout}>Logout</a>
          {loading ? <Loading /> : null}
        </DNNavItem>
      );
    }}
  </Mutation>
);

export default Logout;
