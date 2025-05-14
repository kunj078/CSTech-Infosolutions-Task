import React, { useEffect } from 'react';

const ErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
      {message}
    </div>
  );
};

export default ErrorToast;
