import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/navbar.css";

interface NavbarProps {
  setAuth: (auth: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setAuth }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    setAuth(false);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="logo">
            <span className="logo-genix">Fit</span>
            <span className="logo-fit">Genix</span>
          </h1>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">
              <i className="fas fa-utensils"></i>
              <span>Diet</span>
            </Link></li>
            <li><Link to="/mydiets" className="nav-link">
              <i className="fas fa-list"></i>
              <span>My Diets</span>
            </Link></li>
            <li><Link to="/profile" className="nav-link">
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link></li>
            <li><Link to="/settings" className="nav-link">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </Link></li>
          </ul>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
