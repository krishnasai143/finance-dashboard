import { useState } from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ role, setRole }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setRole(value);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <Link to="/" className="nav-link">
      <div className="navbar-title" style={{ cursor: "pointer" }}>◆ FinanceTrack</div>
      </Link>
      

      <div className="navbar-right">
        <div className="dropdown">

          <div 
            className="dropdown-selected"
            onClick={() => setOpen(!open)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
            <span className="arrow">▼</span>
          </div>

          {open && (
            <div className="dropdown-menu">
              <div onClick={() => handleSelect("admin")}>Admin</div>
              <div onClick={() => handleSelect("viewer")}>Viewer</div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Navbar;