import styled from 'styled-components';

const DNLayout = styled.div `
  padding: 2rem;
  border: 1px solid #DDD;
  max-width: ${props => props.theme.maxWidth};
  background-color: ${props => props.theme.white};
  margin: 0 auto;
`;

export default DNLayout;
