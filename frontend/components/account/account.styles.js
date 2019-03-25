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
  &.active {
    opacity: 1;
    pointer-events: all;
    transform: translateY(50px);
  }
`;

const UserMenuItem = styled.li`
  text-transform: uppercase;
  text-align: center;
  padding: 1rem;
  width: 100%;
  &:hover {
    box-shadow: ${props => props.theme.shadow};
  }
`;

export {
  Form,
  TabContainer,
  Gated,
  UserMenu,
  UserMenuItem,
};
