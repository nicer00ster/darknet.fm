
import { withToastManager } from 'react-toast-notifications';

const Toast = ({ content, toastManager, children }) => {
  return toastManager.add(content, {
    appearance: 'success',
    autoDismiss: true,
  });
};

export default Toast;
