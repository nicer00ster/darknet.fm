import Link from 'next/link'
import Nav from './Nav';
import { DNHeader, Logo } from './header.styles';

const Header = () => (
    <DNHeader>
      <Link href="/">
        <Logo>🞛</Logo>
      </Link>
      <Nav />
    </DNHeader>
);

export default Header;
