import styled from 'styled-components';

const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
`;

const Avatar = props => (
  <AvatarImage src={props.src} alt={props.name}/>
);

export default Avatar;
