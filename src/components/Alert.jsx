import { useEffect, useRef } from 'react';

const Alert = ({ message, type, onClose }) => {
  const timerRef = useRef(null);
  
  useEffect(() => {
    // Limpiar timer anterior si existe
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Solo auto-cerrar si no es error
    if (type !== 'error') {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 4000);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [onClose, type]);

  const alertStyles = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  const handleClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onClose();
  };

  return (
    <div className={`alert ${alertStyles[type]} show`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button 
          onClick={handleClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Alert;
