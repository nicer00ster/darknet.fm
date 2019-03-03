import ResetPassword from '../components/account/ResetPassword';

const ResetPage = props => (
  <ResetPassword resetToken={props.query.resetToken} />
);

export default ResetPage;
