import React from 'react';
import { Redirect } from 'react-router-dom';
import CreatePoll from '../components/CreatePoll';
import ErrorMessage from '../components/ErrorMessage';
import './CreatePollPage.css';

const CreatePollPage = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="create-poll-page">
      <div className="create-poll-container">
        <div className="create-poll-header">
          <h1>Create New Poll</h1>
          <p>Share your question and let others vote on it</p>
        </div>
        <ErrorMessage />
        <CreatePoll />
      </div>
    </div>
  );
};

export default CreatePollPage;
