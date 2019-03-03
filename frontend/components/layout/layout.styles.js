import styled from 'styled-components';

const DNLayout = styled.div `
  display: flex;
  flex-direction: column;
  max-width: ${props => props.theme.maxWidth};
  height: 100vh;
  padding: 2rem;
  margin: 0 auto;
  background-color: ${props => props.theme.white};
`;

export default DNLayout;
