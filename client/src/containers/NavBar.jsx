import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';
import './NavBar.css';

const Navbar = ({ auth, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link className="navbar-brand" to="/">
            <span 
              className="brand-icon" 
              role="img" 
              aria-label="ballot box with ballot"
            >
              🗳️
            </span>
            <span className="brand-text">Poll App</span>
          </Link>
        </div>

        <div className="navbar-right">
          {!auth.isAuthenticated ? (
            <div className="auth-buttons">
              <Link className="nav-button login" to="/login">
                Login
              </Link>
              <Link className="nav-button register" to="/register">
                Register
              </Link>
            </div>
          ) : (
            <div className="user-menu" ref={dropdownRef}>
              <div className="profile-container">
                <button 
                  className="profile-button"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="user-avatar">
                    {auth.user.username.charAt(0).toUpperCase()}
                  </span>
                  <span className="username">{auth.user.username}</span>
                </button>
                {showDropdown && (
                  <div className="profile-dropdown">
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <span className="dropdown-icon">↪</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {auth.isAuthenticated && (
        <Link className="fab" to="/poll/new">
          <span className="fab-icon">+</span>
          <span className="fab-text">New Poll</span>
        </Link>
      )}
    </nav>
  );
};

export default connect(
  store => ({
    auth: store.auth,
  }),
  { logout },
)(Navbar);
