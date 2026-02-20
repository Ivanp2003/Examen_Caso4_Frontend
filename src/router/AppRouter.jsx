import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clientes";
import Tecnicos from "../pages/Tecnicos";
import Tickets from "../pages/Tickets";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
      <Route path="/tecnicos" element={<ProtectedRoute><Tecnicos /></ProtectedRoute>} />
      <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
