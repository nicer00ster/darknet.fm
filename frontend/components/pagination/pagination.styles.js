import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadowHover};
  min-height: 55px;
  white-space: nowrap;
  & a {
    display: flex;
    transition: all 0.25s;
    &:hover {
      background-color: ${props => props.theme.hover};
    }
  }
  & p {
    color: ${props => props.theme.lightBlack};
  }
  & > * {
    margin: 0;
    padding: 15px 30px;
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: ${props => props.theme.grey};
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
    ${props => props.theme.media.tablet`
      margin: 1rem;
    `}
    &:hover {
      background-color: ${props => props.theme.hover};
    }
  }
  a[aria-disabled='true'] {
    color: ${props => props.theme.grey};
    pointer-events: none;
  }
`;

const UserFollowerPaginationContainer = styled.div`
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
  UserFollowerPaginationContainer,
};
