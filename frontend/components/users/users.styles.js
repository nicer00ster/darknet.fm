import styled from 'styled-components';

const UserList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
`;

const UserListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadow};
  box-sizing: border-box;
  margin: 1.2rem;
  padding: 1.2rem;
  width: 17.666%;
  min-width: 175px;
  float: left;
  transition: all 0.35s;
  &:hover {
    box-shadow: ${props => props.theme.shadowHover};
  }
  & p {
    font-size: 16px;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      color: ${props => props.theme.lightBlack};
    }
  }
  & span {
    display: flex;
    justify-content: space-between;
    color: ${props => props.theme.lightBlack};
    pointer-events: none;
    & div {
      padding: .4rem;
      & i {
        color: ${props => props.theme.lightBlack};
        padding-right: .4rem;
      }
    }
  }
`;

const AvatarImage = styled.div`
  width: 35px;
  height: 35px;
  position: relative;
  background-image: ${props => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
  object-fit: fill;
  cursor: pointer;
`;

export {
  UserList,
  UserListItem,
  AvatarImage,
};
