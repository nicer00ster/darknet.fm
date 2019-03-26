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
    margin: 1rem;
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

const Gated = styled.div`
  width: 100%;
  margin: 0 auto;
  & > h2 {
    color: ${props => props.theme.red};
    text-align: center;
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

const UserMenu = styled.ul`
  position: absolute;
  height: auto;
  width: 200px;
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadow};
  background-color: ${props => props.theme.white};
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  z-index: 9999;
  pointer-events: none;
  transition: all 0.25s;
  ${props => props.theme.media.tablet`
    opacity: 1;
    box-shadow: none;
  `}
  &.active {
    opacity: 1;
    pointer-events: all;
    transform: translateY(50px);
    ${props => props.theme.media.tablet`
      transform: translateY(0px);
    `}
  }
  ${props => props.theme.media.tablet`
    position: relative;
  `}
`;

const UserMenuItem = styled.li`
  text-transform: uppercase;
  text-align: center;
  padding: 1rem;
  width: 100%;
  ${props => props.theme.media.tablet `
    display: flex;
    justify-content: center;
    position: relative;
    color: ${props => props.theme.black};
    background-color: transparent;
    text-transform: uppercase;
    padding: 1rem;
    cursor: pointer;
    white-space: nowrap;
    border: 0;
    outline: 0;
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: .1em;
      bottom: 0;
      left: 0;
      background-color: ${props => props.theme.black};
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.15s ease-in-out 0s;
      transition: all 0.15s ease-in-out 0s;
    }
    &:hover:before, &:focus:before {
      visibility: visible;
      -webkit-transform: scaleX(.5);
      transform: scaleX(.5);
    }
    &:hover, &:focus {
      color: ${props => props.theme.black};
    }
    &:disabled {
      color: ${props => props.theme.grey};
    }
  `}
  &:hover {
    box-shadow: ${props => props.theme.shadow};
    ${props => props.theme.media.tablet`
      box-shadow: none;
    `}
  }
`;

export {
  Form,
  TabContainer,
  Gated,
  UserMenu,
  UserMenuItem,
};
