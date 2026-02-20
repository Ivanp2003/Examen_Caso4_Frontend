import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={isActive ? "active" : ""}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
