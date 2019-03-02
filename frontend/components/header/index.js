import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';

import Nav from './Nav';
import { DNHeader, Logo } from './header.styles';

Router.onRouteChangeStart = () => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  NProgress.done();
}
Router.onRouteChangeError = () => {
  console.log('onRouteChangeError ttriggered');
}

const Header = () => (
    <DNHeader>
      <Link href="/">
        <Logo>🞛</Logo>
      </Link>
      <Nav />
    </DNHeader>
);

export default Header;
