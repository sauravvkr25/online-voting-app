import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';
import './AuthPage.css';

const AuthPage = ({ authType, isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{authType === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p>
            {authType === 'login'
              ? 'Sign in to access your polls and start voting'
              : 'Join our community and start creating polls'}
          </p>
        </div>
        <ErrorMessage />
        <Auth authType={authType} />
      </div>
    </div>
  );
};

export default AuthPage;

