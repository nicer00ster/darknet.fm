import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
`;

const TabContainer = styled.div`
  width: 50%;
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  box-shadow: ${props => props.theme.shadow};
  margin: 2rem auto;
  border-radius: ${props => props.theme.radius};
  & > * {
    margin: 0;
    padding: 2rem 3.75rem;
    background-color: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    &:last-child {
      border-right: 0;
    }
  }
  button[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

const Form = styled.form`
  width: 50%;
  margin: 0 auto;
  box-shadow: ${props => props.theme.shadow};
  border: 5px solid ${props => props.theme.white};
  border-radius: ${props => props.theme.radius};
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 800;
  label {
    display: block;
    margin-bottom: 2rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid ${props => props.theme.black};
    border-radius: ${props => props.theme.radius};
    &:focus {
      outline: 0;
    }
  }
  button,
  input[type='submit'] {
    position: relative;
    color: ${props => props.theme.black};
    display: inline-block;
    height: 60px;
    background: ${props => props.theme.white};
    text-align: center;
    transition: 0.5s;
    padding: 0 2rem;
    cursor: pointer;
    border: 0;
    -webkit-transition: 0.25s;
    &:hover {
      background-color: ${props => props.theme.white};
      color: ${props => props.theme.black};
    }
    &:before, &:after {
      width: 100%;
      height:100%;
      z-index: 3;
      content:'';
      position: absolute;
      top:0;
      left:0;
      box-sizing: border-box;
      -webkit-transform: scale(0);
      transition: 0.5s;
    }
    &:before {
      border-bottom: 1px solid ${props => props.theme.black};
      border-left: 1px solid ${props => props.theme.black};
      -webkit-transform-origin: 0 100%;
    }
    &:after {
      border-top: 1px solid ${props => props.theme.black};
      border-right: 1px solid ${props => props.theme.black};
      -webkit-transform-origin: 100% 0%;
    }
    &:hover::after, &:hover::before {
      -webkit-transform: scale(1);
    }
  }
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 1px;
      content: '';
      display: block;
      background-color: ${props => props.theme.black};
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export { Form, TabContainer };
