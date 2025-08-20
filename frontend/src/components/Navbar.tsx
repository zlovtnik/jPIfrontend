import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          JPI
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Dashboard
          </Link>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="navbar-item">
              <div>{user.username}</div>
              <button className="button is-light ml-2" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-item">
              <Link className="button is-primary" to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
