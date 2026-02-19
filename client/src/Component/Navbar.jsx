import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  // Close navbar on link click
  const closeNavbar = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    closeNavbar();
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info shadow-sm fixed-top">
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold text-dark"
          to="/"
          onClick={closeNavbar}
        >
          Hospital Management
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto gap-3 text-center">

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/" onClick={closeNavbar}>Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about" onClick={closeNavbar}>About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact" onClick={closeNavbar}>Contact</Link>
            </li>

            {user && (
              <>
                 <li className="nav-item">
                  <Link className="nav-link nav-link-animate text-dark" onClick={closeNavbar} to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/dashboard" onClick={closeNavbar}>Dashboard</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/appointments" onClick={closeNavbar}>Appointment</Link>
                </li>
              </>
            )}

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/manage-appointments" onClick={closeNavbar}>
                  Manage
                </Link>
              </li>
            )}

            {!user ? (
              <li className="nav-item">
                <Link
                  className="btn btn-outline-dark"
                  to="/auth"
                  onClick={closeNavbar}
                >
                  Login / Signup
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  🚪 Logout ({user.username})
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
