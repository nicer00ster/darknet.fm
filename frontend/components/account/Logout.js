import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import debounce from 'lodash.debounce';

import { CURRENT_USER_QUERY } from '../user';
import Loading from '../loading';
import { DNNavItem } from '../header/header.styles';
import { UserMenu, UserMenuItem } from './styles.account';
import Avatar from '../users/Avatar';

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout {
      message
    }
  }
`;

const isLoading = {
  'pointerEvents': 'none',
  'cursor': 'default',
};

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    }
  }
  showMenu = e => {
    e.preventDefault();

    this.setState({ isOpen: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  closeMenu = e => {
    this.setState({ isOpen: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }
  render() {
    return (
      <Mutation
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
        mutation={LOGOUT_MUTATION}
        onCompleted={() => Router.push('/account')}>
        {(logout, { loading }) => {
          return (
            <DNNavItem
              onMouseEnter={this.state.isOpen ? debounce(this.closeMenu, 750) : this.showMenu}
              onMouseLeave={this.state.isOpen ? debounce(this.closeMenu, 750) : this.showMenu}
              onClick={this.state.isOpen ? this.closeMenu : this.showMenu}
              style={loading ? isLoading : null}>
              <Avatar
                style={loading ? { 'opacity': .25 } : null}
                avatar={this.props.avatar}
                alt={this.props.name} />
              {loading ? <Loading /> : null}
              {this.state.isOpen
              ? <UserMenu
                className={this.state.isOpen ? 'active' : null}>
                  <UserMenuItem onClick={() => Router.push({
                      pathname: '/user',
                      query: {
                        id: this.props.userId,
                      },
                    })}>
                    Account
                  </UserMenuItem>
                  <UserMenuItem>
                    Donate
                  </UserMenuItem>
                  <UserMenuItem onClick={logout}>
                    Logout
                  </UserMenuItem>
                </UserMenu>
              : null}
            </DNNavItem>
          );
        }}
      </Mutation>
    );
  }
}

// const Logout = props => (
//   <Mutation
//     refetchQueries={[
//       { query: CURRENT_USER_QUERY }
//     ]}
//     mutation={LOGOUT_MUTATION}
//     onCompleted={() => Router.push('/account')}>
//     {(logout, { loading }) => {
//       return (
//         <DNNavItem style={loading ? isLoading : null}>
//           {/* <a style={loading ? { color: 'rgba(0,0,0,.25)' } : null} onClick={logout}>Logout</a> */}
//           <Avatar avatar={props.avatar} alt={props.name} />
//           {loading ? <Loading /> : null}
//         </DNNavItem>
//       );
//     }}
//   </Mutation>
// );

export default Logout;
