import { useNavigate } from "react-router-dom";
import NavLink from "./NavLink";

const Navbar = () => {
  const navigate = useNavigate();
  const nombre = localStorage.getItem("nombre");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span>Bienvenido - {nombre}</span>
      <div>
        <NavLink to="/dashboard">Panel Principal</NavLink>
        <NavLink to="/clientes">Clientes</NavLink>
        <NavLink to="/tecnicos">Técnicos</NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
