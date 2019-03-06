import styled from 'styled-components';

const TagContainer = styled.ul`
  padding: 0;
  border-radius: ${props => props.theme.radius};
`;

const TagListItem = styled.li`
  display: inline-block;
  padding: 1rem;
  border: 1px solid ${props => props.theme.lightBlack};
  border-radius: ${props => props.theme.radius};
  margin-right: 6px;
  margin-bottom: 6px;
  font-size: 10px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.25s;
  & span {
    color: ${props => props.theme.lightBlack};
    margin-left: 12px;
  }
  &:hover {
    background-color: ${props => props.theme.lightRed};
  }
`;

const TagInput = styled.input`
  outline: none;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  margin-bottom: 12px;
`;

export {
  TagContainer,
  TagListItem,
  TagInput,
};
