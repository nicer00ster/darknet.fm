import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import debounce from 'lodash.debounce';

import { CURRENT_USER_QUERY } from '../user';
import Loading from '../loading';
import { DNNavItem } from '../header/header.styles';
import { UserMenu, UserMenuItem } from './account.styles';
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
              onMouseEnter={!this.state.isOpen ? debounce(this.showMenu, 500) : null}
              onMouseLeave={this.state.isOpen ? debounce(this.closeMenu, 500) : null}
              onClick={this.state.isOpen ? this.closeMenu : this.showMenu}
              style={loading ? isLoading : null}>
              <Avatar
                style={loading ? { 'opacity': .25 } : null}
                avatar={this.props.avatar}
                alt={this.props.name} />
              {loading ? <Loading /> : null}
              <UserMenu
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
            </DNNavItem>
          );
        }}
      </Mutation>
    );
  }
}

export default Logout;
