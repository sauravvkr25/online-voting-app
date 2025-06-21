import React from 'react';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { store } from '../store';
import { setToken, setCurrentUser, addError } from '../store/actions';

import Auth from '../components/Auth';
import Poll from '../components/Poll';
import Polls from '../components/Polls';
import ErrorMessage from '../components/ErrorMessage';
import CreatePoll from '../components/CreatePoll';
import './TestPage.css';

// Initialize auth state from localStorage if token exists
if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}

const TestPage = ({ isAuthenticated }) => {
  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Provider store={store}>
      <div className="test-page">
        <div className="test-container">
          <div className="test-header">
            <h1>UI Test Page</h1>
            <p>Test and verify all components in isolation</p>
          </div>

          <div className="test-sections">
            <section className="test-section">
              <h2>Error Component Test</h2>
              <div className="test-component">
                <ErrorMessage />
              </div>
            </section>

            <section className="test-section">
              <h2>Auth Component Test</h2>
              <div className="test-component">
                <Auth />
              </div>
            </section>

            <section className="test-section">
              <h2>Create Poll Component Test</h2>
              <div className="test-component">
                <CreatePoll />
              </div>
            </section>

            <section className="test-section">
              <h2>Polls Component Test</h2>
              <div className="test-component">
                <Polls />
              </div>
            </section>

            <section className="test-section">
              <h2>Poll Component Test</h2>
              <div className="test-component">
                <Poll />
              </div>
            </section>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default TestPage;
