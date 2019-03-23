import { AvatarImage } from './users.styles';

const Avatar = props => (
  <AvatarImage src={props.avatar} alt={props.alt} />
);

export default Avatar;
