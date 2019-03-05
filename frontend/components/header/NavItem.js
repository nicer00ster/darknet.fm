import Link from 'next/link';
import { DNNavItem } from './header.styles';
import ActiveLink from './ActiveLink';

const NavItem = props => (
  <DNNavItem>
    <ActiveLink href={props.link} as={props.as}>
      {props.title}
    </ActiveLink>
  </DNNavItem>
);

export default NavItem;
