import styled from 'styled-components';

const ControlContainer = styled.div`
  position: relative;
  width: 624px;
  margin: 0;
`;

const ControlsStyles = styled.div`
  position: relative;
  background-color: ${props => props.theme.white};
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadow};
  height: 76px;
  ${'' /* margin-top: 28px; */}
  z-index: 5;
`;

const Bar = styled.div`
  height: 2px;
  background-color: ${props => props.theme.black};
  border-radius: ${props => props.theme.radius};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 70px;
  padding: 0 15px;
`;

const Play = styled.div`
  width: 65px;
  height: auto;
  border-radius: 10px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  margin: 5px 0;
  font-size: 32px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  transition: background-color .3s ease;
  -webkit-transition: background-color .3s ease;
  &:hover {
    background-color: #eee;
    transition: background-color .3s ease;
    -webkit-transition: background-color .3s ease;
  }
`;

const Forward = styled.div`
  width: 55px;
  height: auto;
  border-radius: 10px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  margin: 5px 0;
  font-size: 32px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  transition: background-color .3s ease;
  -webkit-transition: background-color .3s ease;
  &:hover {
    background-color: #eee;
    transition: background-color .3s ease;
    -webkit-transition: background-color .3s ease;
  }
`;

const Rewind = styled.div`
  width: 55px;
  height: auto;
  border-radius: 10px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  margin: 5px 0;
  font-size: 32px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  transition: background-color .3s ease;
  -webkit-transition: background-color .3s ease;
  &:hover {
    background-color: #eee;
    transition: background-color .3s ease;
    -webkit-transition: background-color .3s ease;
  }
`;

const Seek = styled.div`
  position: relative;
  width: 624px;
  ${'' /* margin: 7px 0 0 16px; */}
  height: 4px;
  ${'' /* padding: 0; */}
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
  }
`;

export {
  ControlContainer,
  ControlsStyles,
  Buttons,
  Play,
  Forward,
  Rewind,
  Bar,
  Seek,
};
