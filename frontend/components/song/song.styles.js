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
  font-size: 24px;
  background-color: ${props => props.theme.lightBlack};
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: .5rem;
  & a {
    color: ${props => props.theme.white};
    transition: all 0.25s;
    &:hover {
      color: ${props => props.theme.black};
      font-weight: bold;
    }
  }
  & p {
    color: ${props => props.theme.white};
    transition: all 0.25s;
    padding: 0 0 1rem 0;
    margin: 0;
    font-size: 14px;
    pointer-events: none;
  }
`;

const Headline = styled.div`
  font-size: 12px;
  background-color: ${props => props.theme.lightBlack};
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: .5rem;
  & a {
    color: ${props => props.theme.white};
    transition: all 0.25s;
    &:hover {
      color: ${props => props.theme.lightBlack};
      font-weight: bold;
    }
  }
`;

const UserAndTitle = styled.div`
  flex: 1;
`;

const TitleContainer = styled.div`
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
`;

const SongMetaData = styled.div`
  position: absolute;
  top: 29px;
  width: 150px;
  right: 390px;
  text-align: right;
  user-select: none;
  & div:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & a {
      margin: .25rem;
    }
  }
`;

const Tag = styled.a`
    position: relative;
    display: inline-block;
    height: 22px;
    padding: 0 6px;
    background: ${props => props.theme.lightBlack};
    border: 1px solid ${props => props.theme.lightBlack};
    border-left-width: 0;
    color: ${props => props.theme.white};
    font-weight: 100;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: all 0.25s;
    &:hover {
      background: ${props => props.theme.black};
    }
    & span {
      max-width: 120px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: normal;
    }
    &:before {
      content: "#";
      display: block;
      float: left;
      margin-right: 3px;
    }
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

const PlayerContainer = styled.div`
  position: relative;
  height: 96px;
  width: 100%;
  margin: 1rem 0;
`;

export {
  SongContainer,
  Foreground,
  ArtWrapper,
  Artwork,
  Title,
  TitleContainer,
  Headline,
  UserAndTitle,
  PlayButton,
  Tag,
  SongMetaData,
  PlayerContainer,
};
