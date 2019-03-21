import styled from 'styled-components';

const DNHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 152px;
`;

const DNNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  & ul {
    display: flex;
    list-style: none;
    & li {
      & a {
        padding: .5rem;
        text-transform: uppercase;
      }
    }
  }
`;

const DNNavItem = styled.li`
  display: flex;
  justify-content: center;
  position: relative;
  color: ${props => props.theme.black};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 1rem;
  cursor: pointer;
  white-space: nowrap;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: .1em;
    bottom: 0;
    left: 0;
    background-color: black;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.15s ease-in-out 0s;
    transition: all 0.15s ease-in-out 0s;
  }
  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(.5);
    transform: scaleX(.5);
  }
  &:hover {
    color: ${props => props.theme.black};
  }
  & a.active {
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: .1em;
      bottom: 0;
      left: 0;
      background-color: black;
      color: ${props => props.theme.black};
      -webkit-transform: scaleX(.5);
      transform: scaleX(.5);
      -webkit-transition: all 0.15s ease-in-out 0s;
      transition: all 0.15s ease-in-out 0s;
    }
  }
`;

const Logo = styled.a`
  font-decoration: none;
  font-size: 76px;
  color: ${props => props.theme.black};
  filter: drop-shadow(0 .5rem 0.35rem #1f222e);
  cursor: pointer;
  transition: ease-in-out 0.5s;
  &:hover {
    color: #fefefe;
  }
`;

export { DNHeader, DNNav, DNNavItem, Logo };
