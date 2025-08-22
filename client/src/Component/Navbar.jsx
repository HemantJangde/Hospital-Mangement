import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info shadow-sm fixed-top">
      <div className="container">
        {/* Title */}
        <Link className="navbar-brand fw-bold text-dark navbar-brand-animate" to="/">
          Hospital Management
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            {/* Public Pages */}
            <li className="nav-item">
              <Link className="nav-link nav-link-animate text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-animate text-dark" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-animate text-dark" to="/contact">Contact</Link>
            </li>

            {/* Protected Links */}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-animate text-dark" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-animate text-dark" to="/appointments">Appointment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-animate text-dark" to="/register">Register</Link>
                </li>
              </>
            )}

            {/* Admin Only */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link nav-link-animate text-dark" to="/manage-appointments">Manage</Link>
              </li>
            )}

            {/* Auth Buttons */}
            {!user ? (
              <li className="nav-item">
                <Link className="btn btn-outline-dark btn-hover" to="/auth">Login / Signup</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger btn-hover">
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
