import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Alert from "../components/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);
  const [inputStatus, setInputStatus] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showAlert = useCallback((message, type = 'success') => {
    setAlert({ message, type });
  }, []);

  const handleCloseAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    
    // Validación en tiempo real
    if (field === 'email') {
      if (!value) {
        setInputStatus(prev => ({ ...prev, email: 'empty' }));
      } else if (!validateEmail(value)) {
        setInputStatus(prev => ({ ...prev, email: 'error' }));
      } else {
        setInputStatus(prev => ({ ...prev, email: 'success' }));
      }
    } else if (field === 'password') {
      if (!value) {
        setInputStatus(prev => ({ ...prev, password: 'empty' }));
      } else if (value.length < 6) {
        setInputStatus(prev => ({ ...prev, password: 'error' }));
      } else {
        setInputStatus(prev => ({ ...prev, password: 'success' }));
      }
    }
  };

  const getInputClass = (field) => {
    const status = inputStatus[field];
    if (status === 'error') return 'input-error';
    if (status === 'success') return 'input-success';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación final
    if (!form.email || !form.password) {
      setError("Por favor completa todos los campos");
      showAlert("Por favor completa todos los campos", 'error');
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Por favor ingresa un email válido");
      showAlert("Por favor ingresa un email válido", 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = await login(form.email, form.password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("apellido", data.apellido);
        localStorage.setItem("email", data.email);
        setError("");
        showAlert("¡Inicio de sesión exitoso!", 'success');
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        const errorMsg = "Usuario o contraseña incorrectos";
        setError(errorMsg);
        showAlert(errorMsg, 'error');
      }
    } catch (error) {
      let errorMsg = "Error al iniciar sesión";
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        errorMsg = "No se puede conectar al servidor. Verifica tu conexión.";
      } else if (error.response?.status === 401) {
        errorMsg = "Usuario o contraseña incorrectos";
      } else if (error.response?.status === 400) {
        errorMsg = "Datos inválidos. Verifica email y contraseña";
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      
      setError(errorMsg);
      showAlert(errorMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={handleCloseAlert} 
        />
      )}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          {error && <p className="error">{error}</p>}
          
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              required
              value={form.email}
              onChange={e => handleInputChange('email', e.target.value)}
              className={`login-input ${getInputClass('email')}`}
            />
            </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Contraseña" 
              required
              value={form.password}
              onChange={e => handleInputChange('password', e.target.value)}
              className={`login-input ${getInputClass('password')}`}
            />
          </div>

          <button 
            type="submit" 
            className={`login-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Iniciando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
