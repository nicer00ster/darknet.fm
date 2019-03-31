import { withRouter } from 'next/router'
import Link from 'next/link';

const ActiveLink = ({ children, router, href, as }) => {
  const activeClass = router.pathname === href ? 'active' : '';

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  }

  return (
    <Link href={href} as={as}>
      <a className={activeClass}>{children}</a>
    </Link>
  );
}

export default withRouter(ActiveLink);
