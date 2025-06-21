import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getCurrentPoll } from '../store/actions';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import PollPage from '../pages/PollPage';
import CreatePollPage from '../pages/CreatePollPage';
import TestPage from '../pages/TestPage';

const RouteViews = ({ getCurrentPoll, auth }) => (
  <main className="container">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          <AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />
        }
      />
      <Route
        path="/register"
        element={
          <AuthPage
            authType="register"
            isAuthenticated={auth.isAuthenticated}
          />
        }
      />
      <Route
        path="/poll/new"
        element={<CreatePollPage isAuthenticated={auth.isAuthenticated} />}
      />
      <Route
        path="/poll/:id"
        element={<PollPage getPoll={id => getCurrentPoll(id)} />}
      />
      <Route
        path="/test"
        element={<TestPage isAuthenticated={auth.isAuthenticated} />}
      />
    </Routes>
  </main>
);

export default connect(
  store => ({
    auth: store.auth,
  }),
  { getCurrentPoll },
)(RouteViews);
