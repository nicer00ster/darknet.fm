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

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export {
  UserList,
  UserListItem,
  Avatar,
};
