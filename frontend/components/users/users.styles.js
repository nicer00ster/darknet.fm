import styled from 'styled-components';

const UserList = styled.ul`
  list-style: none;
`;

const UserListItem = styled.li`
  display: flex;
  padding: 1rem;
  border-radius: ${props => props.theme.radius};
  transition: all 0.25s;
  cursor: pointer;
  &:hover {
    box-shadow: ${props => props.theme.shadow};
  }
`;

const AvatarImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: fill;
`;

export {
  UserList,
  UserListItem,
  AvatarImage,
};
