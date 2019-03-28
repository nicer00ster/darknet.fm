import React, { Component } from 'react';

import NavItem from './NavItem';
import Search from '../search';
import User from '../user';
import Logout from '../account/Logout';
import Loading from '../loading';
import { DNNav, MobileMenu } from './header.styles';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      width: 769,
      height: 0,
      showMenu: false,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    if(this.state.width >= 768) {
      this.setState({
        showMenu: false,
      });
    }
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  handleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }
  render() {
    return (
      <User>
        {({ data: { currentUser }, loading }) => {
          return (
            <DNNav>
              <Search />
              {this.state.width <= 768 ? <i onClick={this.handleMenu} className="fal fa-bars fa-3x"></i> : null}
              <MobileMenu className={this.state.showMenu ? 'open' : ''}>
                {this.state.width <= 768 ? <i onClick={this.handleMenu} className="fal fa-times-circle fa-3x"></i> : null}
                <NavItem
                  title="library"
                  onClick={this.handleMenu}
                  link="/library" />
                {currentUser && (
                  <>
                  <NavItem
                    title="upload"
                    onClick={this.handleMenu}
                    link="/upload" />
                  <NavItem
                    title="users"
                    onClick={this.handleMenu}
                    link="/users" />
                  <Logout
                    handleMenu={this.handleMenu}
                    userId={currentUser.id}
                    avatar={currentUser.avatar}
                    name={currentUser.name} />
                  </>
                )}
                {!currentUser && (
                  <>
                  <NavItem
                    title="users"
                    onClick={this.handleMenu}
                    link="/users" />
                  <NavItem
                    title="login"
                    onClick={this.handleMenu}
                    link="/account" />
                  </>
                )}
              </MobileMenu>
            </DNNav>
          );
        }}
      </User>
    );
  }
}

export default Nav;
