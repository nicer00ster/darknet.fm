import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.black};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.black};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 6px solid ${props => (props.highlighted ? props.theme.lightBlack : props.theme.white)};
  img {
    margin-right: 10px;
  }
  div {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    & span:first-child {
      font-weight: bold;
    }
  }
`;

const highlight = keyframes`
  from { background: #5264AE; }
  to 	{ width:0; background:transparent; }
`;

const SearchStyles = styled.div`
  z-index: 9999;
  position: relative;
  margin: 45px 0;
  ${props => props.theme.media.tablet`
    width: 85%;
  `}
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }
  input {
    background: none;
    color: ${props => props.theme.black};
    font-size: 14px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 320px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${props => props.theme.lightBlack};
    transition: all 0.25s;
    ${props => props.theme.media.tablet`
      width: 100%;
    `}
    &:focus {
      outline: none;
    }
    &:focus ~ label,
    &:valid ~ label {
      top: -14px;
      font-size: 12px;
      color: ${props => props.theme.black};
    }
    &:focus ~ .bar:before {
      width: 320px;
      ${props => props.theme.media.tablet`
        width: 100%;
      `}
    }
  }
  label {
    color: ${props => props.theme.black};
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 6px;
    transition: 300ms ease all;
    & i {
      padding-right: 1rem;
    }
  }
  .bar {
    position: relative;
    display: block;
    width: 320px;
    ${props => props.theme.media.tablet`
      width: 100%;
    `}
    &:before {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0px;
      position: absolute;
      background: ${props => props.theme.black};
      transition: 300ms ease all;
      left: 0%;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
