import NavItem from './NavItem';
import Search from '../search';
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
                title="users"
                link="/users" />
              <NavItem
                title="account"
                // as={`/user/${data.currentUser.name}`}
                link={`/user?id=${data.currentUser.id}`} />
              <Logout />
              </>
            )}
            {!data.currentUser && (
              <>
              <NavItem
                title="users"
                link="/users" />
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
