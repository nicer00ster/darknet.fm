import styled from 'styled-components';

const DNLayout = styled.div `
  display: flex;
  flex-direction: column;
  max-width: ${props => props.theme.maxWidth};
  ${'' /* height: 100%; */}
  padding: 2rem;
  margin: 0 auto;
  background-color: ${props => props.theme.white};
  position: relative;
  ${props => props.theme.media.tablet`
    padding: 1rem;
    max-width: ${props => props.theme.sizes.tablet}px;
  `}
  ${props => props.theme.media.phone`
    max-width: ${props => props.theme.sizes.phone}px;
  `}
`;

const DNInput = styled.div`
  position: relative;
  margin: 45px 0;
  input[type="text"]::-webkit-search-decoration,
  input[type="text"]::-webkit-search-cancel-button,
  input[type="text"]::-webkit-search-results-button,
  input[type="text"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }
  input[type="email"]::-webkit-search-decoration,
  input[type="email"]::-webkit-search-cancel-button,
  input[type="email"]::-webkit-search-results-button,
  input[type="email"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }
  input {
    background: none;
    color: ${props => props.theme.black};
    font-size: 14px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${props => props.theme.lightBlack};
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
      width: 100%;
    }
  }
  label {
    color: ${props => props.theme.black};
    font-size: 16px;
    font-weight: bold;
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
    width: 100%;
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

export {
  DNLayout,
  DNInput,
};
