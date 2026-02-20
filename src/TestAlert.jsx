import { useState } from 'react';
import Alert from './Alert';

const TestAlert = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Prueba de Alert</h2>
      <button onClick={() => setShowAlert(true)}>
        Mostrar Alert de Error
      </button>
      <button onClick={() => setShowAlert(false)}>
        Ocultar Alert
      </button>
      
      {showAlert && (
        <Alert 
          message="Este es un mensaje de prueba de error" 
          type="error" 
          onClose={() => setShowAlert(false)} 
        />
      )}
    </div>
  );
};

export default TestAlert;
