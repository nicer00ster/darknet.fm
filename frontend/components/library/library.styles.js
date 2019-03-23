import styled from 'styled-components';

const LibraryContainer = styled.div`
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SongList = styled.ul`
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
      border-top-right-radius: ${props => props.theme.radius};
      border-top-left-radius: ${props => props.theme.radius};
    }
  }
  & div.details {
    padding: 1rem;
    width: 100%;
    z-index: 1;
    & .artist {
      font-size: 15px;
    }
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
  SongList,
  SongListItem,
};
