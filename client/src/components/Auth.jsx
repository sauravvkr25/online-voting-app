import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser, logout } from '../store/actions';
import './Auth.css';

const Auth = ({ authType, authUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authUser(authType || 'login', formData);
  };

  const isLogin = authType === 'login';

  return (
    <form className="auth-form animate-in" onSubmit={handleSubmit}>
      <div className="form-group animate-in">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
            className="form-input"
            placeholder="Enter your username"
            required
          />
        </div>
      </div>

      <div className="form-group animate-in">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <div className="input-wrapper">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            className="form-input"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>

      <button
        className="submit-button animate-in"
        type="submit"
      >
        {isLogin ? 'Sign In' : 'Create Account'}
      </button>

      <div className="auth-footer animate-in">
        <p>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span className="link-wrapper">
            <Link
              to={isLogin ? '/register' : '/login'}
              className="auth-link"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default connect(() => ({}), { authUser, logout })(Auth);
