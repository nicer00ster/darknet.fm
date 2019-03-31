import { AvatarImage } from './users.styles';

const Avatar = props => (
  <AvatarImage
    onClick={props.onClick}
    style={props.style}
    src={props.avatar} />
);

export default Avatar;
