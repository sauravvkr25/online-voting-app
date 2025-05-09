import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser, logout } from '../store/actions';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { username, password } = this.state;
    const { authType } = this.props;
    e.preventDefault();
    this.props.authUser(authType || 'login', { username, password });
  }

  render() {
    const { username, password } = this.state;
    const { authType } = this.props;
    const isLogin = authType === 'login';

    return (
      <form className="auth-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.handleChange}
              autoComplete="off"
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              autoComplete="off"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button className="submit-button" type="submit">
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link
              to={isLogin ? '/register' : '/login'}
              className="auth-link"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);
