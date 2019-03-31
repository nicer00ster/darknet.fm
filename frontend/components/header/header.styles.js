import styled from 'styled-components';

const DNHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 152px;
  ${props => props.theme.media.tablet`
    min-height: 0;
  `}
`;

const DNNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  & i {
    cursor: pointer;
    padding: .4rem;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  list-style: none;
  transition: all 0.35s ease-in-out;
  ${props => props.theme.media.tablet`
    z-index: 999999;
    width: 100%
    height: 100%;
    box-shadow: ${props => props.theme.shadow};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.white};
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    transform: translateY(-1600px);
    font-size: 1.5rem;
  `}
  &.open {
    ${props => props.theme.media.tablet`
      transform: translateY(0);
      padding: 2rem;
      & i {
        align-self: flex-end;
      }
    `}
  }
  & li {
    & a {
      padding: 10px;
      text-transform: uppercase;
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
    background-color: ${props => props.theme.black};
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.15s ease-in-out 0s;
    transition: all 0.15s ease-in-out 0s;
  }
  &:hover:before, &:focus:before {
    visibility: visible;
    -webkit-transform: scaleX(.5);
    transform: scaleX(.5);
  }
  &:hover, &:focus {
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
  ${props => props.theme.media.tablet`
    flex-direction: column;
    &:last-child {
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 0;
        bottom: 0;
        left: 0;
        background-color: none;
        visibility: hidden;
        -webkit-transform: none;
        transform: none;
        -webkit-transition: all 0.15s ease-in-out 0s;
        transition: all 0.15s ease-in-out 0s;
      }
      &:hover:before, &:focus:before {
        visibility: visible;
        -webkit-transform: none;
        transform: none;
      }
      &:hover, &:focus {
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
          -webkit-transform: none;
          transform: none;
          -webkit-transition: all 0.15s ease-in-out 0s;
          transition: all 0.15s ease-in-out 0s;
        }
      }
    }
  `}
`;

const Logo = styled.a`
  font-size: 76px;
  color: ${props => props.theme.black};
  filter: drop-shadow(0 .5rem 0.25rem #1f222e);
  cursor: pointer;
  transition: ease-in-out 0.35s;
  margin-right: 1rem;
  &:hover {
    color: #fefefe;
  }
  ${props => props.theme.media.tablet`
    font-size: 54px;
  `}
`;

export { DNHeader, DNNav, DNNavItem, Logo, MobileMenu };
