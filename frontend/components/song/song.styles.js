import styled from 'styled-components';

const SongContainer = styled.div`
  position: relative;
  height: 380px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadow};
`;

const Foreground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  padding: 30px 560px 20px 30px;
  z-index: 10;
`;

const ArtWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  width: 340px;
  height: 340px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
  }
`;

const Artwork = styled.span`
  width: 35px;
  height: 30px;
  background-size: 35px 30px;
  position: absolute;
  z-index: 1;
`;

const Title = styled.div`
  -ms-word-break: break-all;
  -webkit-word-break: break-all;
  word-break: break-word;
  -webkit-hyphens: auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  &:before {
    content: "";
    display: table;
  }
`;

const TitleContainer = styled.div`
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
`;

const PlayButton = styled.div`
  height: 60px;
  width: 60px;
  margin-right: 10px;
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
  & button {
    width: 100%;
    height: 100%;
    font-size: 32px;
    cursor: pointer;
    outline: 0;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.black};
    background-color: ${props => props.theme.white};
    transition: all 0.25s;
    &:hover {
      font-size: 36px;
    }

  }
`;

export {
  SongContainer,
  Foreground,
  ArtWrapper,
  Artwork,
  Title,
  TitleContainer,
  PlayButton,
};
