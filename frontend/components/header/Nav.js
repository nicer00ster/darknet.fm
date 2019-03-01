import NavItem from './NavItem';
import { DNNav } from './header.styles';

const Nav = () => (
  <DNNav>
    <ul>
      <NavItem
        title="home"
        link="/" />
      <NavItem
        title="about"
        link="/about" />
    </ul>
  </DNNav>
);

export default Nav;
