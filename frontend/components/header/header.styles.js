import styled from 'styled-components';

const DNHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DNNav = styled.nav`
  width: 50%;
  & ul {
    display: flex;
    list-style: none;
    & li {
      & a {
        padding: 20px;
        text-transform: uppercase;
      }
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

export { DNHeader, DNNav, Logo };
