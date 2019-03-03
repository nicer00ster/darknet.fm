import NavItem from './NavItem';
import Search from './Search';
import User from '../user';
import Logout from '../account/Logout';
import { DNNav } from './header.styles';

const Nav = () => (
  <User>
    {({ data }) => {
      return (
        <DNNav>
          <Search />
          <ul>
            <NavItem
              title="library"
              link="/library" />
            {data.currentUser && (
              <>
              <NavItem
                title="upload"
                link="/upload" />
              <NavItem
                title="about"
                link="/about" />
              <NavItem
                title="account"
                link="/account" />
              <Logout />
              </>
            )}
            {!data.currentUser && (
              <>
              <NavItem
                title="about"
                link="/about" />
              <NavItem
                title="login"
                link="/account" />
              </>
            )}
          </ul>
        </DNNav>
      )
    }}
  </User>
);

export default Nav;
