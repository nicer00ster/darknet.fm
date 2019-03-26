import styled from 'styled-components';

const ControlContainer = styled.div`
  position: relative;
  width: 624px;
  margin: 0;
`;

const ControlsStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: ${props => props.theme.white};
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadow};
  height: 76px;
  z-index: 5;
`;

const Bar = styled.div`
  height: 2px;
  background-color: ${props => props.theme.black};
  border-radius: ${props => props.theme.radius};
`;

const Buttons = styled.div`
  display: flex;
  height: 70px;
  padding: 0 15px;
`;

const MetaButtons = styled.div`
  display: flex;
`;

const Time = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  height: 24px;
  padding: 4px;
  & span {
    color: ${props => props.theme.white};
    height: 16px;
    padding: 0 4px;
    font-size: 10px;
    border-radius: ${props => props.theme.radius};
    background-color: ${props => props.theme.lightBlack}
  }
`;

const Play = styled.button`
  width: 65px;
  outline: 0;
  border: 0;
  height: auto;
  border-radius: ${props => props.theme.radius};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  margin: 5px 0;
  font-size: 32px;
  text-align: center;
  background-color: ${props => props.theme.white};
  cursor: pointer;
  transition: background-color .3s ease;
  -webkit-transition: background-color .3s ease;
  &:hover, &:focus {
    background-color: #eee;
    transition: background-color .3s ease;
    -webkit-transition: background-color .3s ease;
  }
`;

const Forward = styled.button`
  width: 55px;
  outline: 0;
  border: 0;
  height: auto;
  border-radius: ${props => props.theme.radius};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  margin: 5px 0;
  font-size: 32px;
  text-align: center;
  background-color: ${props => props.theme.white};
  cursor: pointer;
  transition: background-color .3s ease;
  -webkit-transition: background-color .3s ease;
  &:hover, &:focus {
    background-color: #eee;
    transition: background-color .3s ease;
    -webkit-transition: background-color .3s ease;
  }
`;

const Rewind = styled.button`
  width: 55px;
  outline: 0;
  border: 0;
  height: auto;
  border-radius: ${props => props.theme.radius};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  margin: 5px 0;
  font-size: 32px;
  text-align: center;
  background-color: ${props => props.theme.white};
  cursor: pointer;
  transition: background-color .3s ease;
  -webkit-transition: background-color .3s ease;
  &:hover, &:focus {
    background-color: #eee;
    transition: background-color .3s ease;
    -webkit-transition: background-color .3s ease;
  }
`;

const Heart = styled.button`
  width: 55px;
  outline: 0;
  border: 0;
  height: auto;
  border-radius: ${props => props.theme.radius};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  margin: 5px 0;
  font-size: 32px;
  text-align: center;
  background-color: ${props => props.theme.white};
  cursor: pointer;
  transition: background-color .3s ease;
  -webkit-transition: background-color .3s ease;
  &:hover, &:focus {
    background-color: #eee;
    transition: background-color .3s ease;
    -webkit-transition: background-color .3s ease;
  }
`;

const Mute = styled.button`
  width: 55px;
  outline: 0;
  border: 0;
  height: auto;
  border-radius: ${props => props.theme.radius};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  margin: 5px 0;
  font-size: 32px;
  text-align: center;
  background-color: ${props => props.theme.white};
  cursor: pointer;
  transition: background-color .3s ease;
  -webkit-transition: background-color .3s ease;
  &:hover, &:focus {
    background-color: #eee;
    transition: background-color .3s ease;
    -webkit-transition: background-color .3s ease;
  }
`;

const Seek = styled.div`
  position: relative;
  width: 624px;
  height: 4px;
  border: 1px solid ${props => props.theme.black};
  border-radius: ${props => props.theme.radius};
  box-shadow: 0px 0px 10px 2px rgba(46,61,73,0.5);
  display: inline-block;
  vertical-align: top;
  & .progress {
    position: absolute;
    width: 0%;
    height: 100%;
    background: ${props => props.theme.black};
  }
  & .scrubber {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin: -8px 0 0 -9px;
    background: ${props => props.theme.white};
    border: solid 1px ${props => props.theme.lightBlack};
    cursor: pointer;
    box-shadow: 0 0 5px #000, inset 0 0 4px #400;
    transition: background 0.25s, transform 0.25s;
    &:before {
      content: "";
      padding: 3rem;
    }
    &:hover, &:focus {
      transform: scale(1.2);
      background: ${props => props.theme.black};
    }
  }
`;

export {
  ControlContainer,
  ControlsStyles,
  Buttons,
  MetaButtons,
  Play,
  Forward,
  Rewind,
  Heart,
  Mute,
  Bar,
  Seek,
  Time,
};
