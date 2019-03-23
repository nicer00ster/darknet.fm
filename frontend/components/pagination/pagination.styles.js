import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.lightBlack};
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadow};
  min-height: 55px;
  white-space: nowrap;
  & a {
    display: flex;
    transition: all 0.25s;
    &:hover {
      background-color: ${props => props.theme.hover};
    }
  }
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.lightBlack};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

const UserSongPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  min-height: 55px;
  white-space: nowrap;
  a {
    display: flex;
    border: 1px solid ${props => props.theme.grey};
    padding: 1rem;
    border-radius: ${props => props.theme.radius};
    transition: all 0.25s;
    &:hover {
      background-color: ${props => props.theme.hover};
    }
  }
  a[aria-disabled='true'] {
    color: ${props => props.theme.grey};
    pointer-events: none;
  }
`;

export {
  PaginationContainer,
  UserSongPaginationContainer,
};
