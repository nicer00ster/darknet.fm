import { withRouter } from 'next/router'

const ActiveLink = ({ children, router, href }) => {
  const activeClass = router.pathname === href ? 'active' : '';

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} className={activeClass} onClick={handleClick}>
      {children}
    </a>
  );
}

export default withRouter(ActiveLink);
