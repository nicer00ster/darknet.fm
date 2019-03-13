import Upload from '../components/upload';
import GatedLogin from '../components/account/GatedLogin';

const UploadPage = () => (
  <GatedLogin>
    <Upload />
  </GatedLogin>
);

export default UploadPage;
