import Link from 'next/link';

const NavItem = props => (
  <li>
    <Link href={props.link}>
      <a>{props.title}</a>
    </Link>
  </li>
);

export default NavItem;
