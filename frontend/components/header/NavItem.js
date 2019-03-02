import Link from 'next/link';
import { DNNavItem } from './header.styles';

const NavItem = props => (
  <DNNavItem>
    <Link href={props.link}>
      <a>{props.title}</a>
    </Link>
  </DNNavItem>
);

export default NavItem;
