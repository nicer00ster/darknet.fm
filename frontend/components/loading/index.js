import styled from 'styled-components';

const Spinner = styled.div`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    /* left: 50%; */
    right: 0;
    width: 30px;
    height: 30px;
    margin-top: -15px;
    margin-left: -15px;
    border-radius: 50%;
    border: 1px solid #ccc;
    border-top-color: ${props => props.theme.black};
    animation: spinner .6s linear infinite;
  }
`;

const Loading = () => (
  // <div style={{ position: 'relative' }}>
    <Spinner />
  // </div>
);

export default Loading;
