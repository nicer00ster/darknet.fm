import styled from 'styled-components';

const LibraryContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  list-style: none;
`;

const SongListItem = styled.li`
  box-sizing: border-box;
  box-shadow: ${props => props.theme.shadow};
  border-radius: ${props => props.theme.radius};
  margin: 1.2rem;
  width: 17.666%;
  min-width: 175px;
  float: left;
  cursor: pointer;
  transition: all 0.35s;
  & div.art {
    width: 100%;
    position: relative;
    & img {
      width: 100%;
      height: 150px;
      object-fit: fill;
    }
  }
  & div.details {
    padding: 1rem;
    width: 100%;
    z-index: 1;
    & .description {
      color: ${props => props.theme.lightBlack};
    }
  }
  &:hover {
    border: 0;
    box-shadow: ${props => props.theme.shadowHover};
  }
`;


export {
  LibraryContainer,
  SongListItem,
};
