import { AvatarImage } from './users.styles';

const Avatar = props => (
  <AvatarImage
    onClick={props.onClick}
    style={props.style}
    src={props.avatar}
    alt={props.alt} />
);

export default Avatar;
