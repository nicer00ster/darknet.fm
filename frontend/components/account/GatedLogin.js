import { Query } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../user';
import Login from './Login';
import Loading from '../loading';
import { Gated } from './account.styles';

const GatedLogin = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if(loading) return <Loading />
      if(!data.currentUser) {
        return (
          <Gated>
            <h2>You must be logged in to view this page.</h2>
            <Login />
          </Gated>
        );
      }
      return props.children;
    }}
  </Query>
);

export default GatedLogin;
