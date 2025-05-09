import React from 'react';
import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';
import './PollPage.css';

const PollPage = ({ match, getPoll, poll }) => {
  getPoll(match.params.id);

  return (
    <div className="poll-page">
      <div className="poll-container">
        <ErrorMessage />
        <Poll />
      </div>
    </div>
  );
};

export default PollPage;
