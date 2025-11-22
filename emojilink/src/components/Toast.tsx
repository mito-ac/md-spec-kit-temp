import { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

const Toast = ({ message, isVisible }: ToastProps) => {
  if (!isVisible) return null;

  return (
    <div className="toast">
      {message}
    </div>
  );
};

export default Toast;
