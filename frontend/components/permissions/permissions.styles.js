import styled from 'styled-components';

const PermissionsContainer = styled.div`
  border-radius: ${props => props.theme.radius};
  box-shadow: ${props => props.theme.shadow};
  padding: 2rem;
`;

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${props => props.theme.white};
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.white};
    border-right: 1px solid ${props => props.theme.white};
    padding: 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      text-align: center;
      padding: 10px 5px;
      display: block;
    }
  }
  tr {
    &:hover {
      background: ${props => props.theme.white};
    }
  }
`;

const Checkbox = styled.input`
  top: 0;
  left: 0;
  width: 100%;
  cursor: inherit;
  height: 100%;
  margin: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
`;

export {
  Table,
  PermissionsContainer,
  Checkbox,
};
