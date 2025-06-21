import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { vote } from '../store/actions';
import { color } from '../services/color';
import './Poll.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Poll = ({ poll, vote, auth }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const getAuthorName = () => {
    if (!poll || !poll.author) return 'Anonymous';
    return poll.author.username || 'Anonymous';
  };

  const handleVote = () => {
    if (selectedOption !== null) {
      vote(poll._id, { answer: selectedOption });
      setHasVoted(true);
    }
  };

  const hasUserVoted = poll.voted && poll.voted.includes(auth.user.id);

  const answers =
    poll.options &&
    poll.options.map(option => (
      <div key={option._id} className="poll-option-wrapper">
        {hasVoted || hasUserVoted ? (
          <div className="poll-result">
            <div className="result-header">
              <span className="option-text">{option.option}</span>
              <span className="vote-count">{option.votes} votes</span>
            </div>
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ 
                  width: `${poll.options.reduce((sum, opt) => sum + opt.votes, 0) > 0 
                    ? (option.votes / poll.options.reduce((sum, opt) => sum + opt.votes, 0) * 100) 
                    : 0}%` 
                }}
              />
              <span className="percentage">
                {poll.options.reduce((sum, opt) => sum + opt.votes, 0) > 0
                  ? Math.round((option.votes / poll.options.reduce((sum, opt) => sum + opt.votes, 0)) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        ) : (
          <label className="poll-option">
            <input
              type="radio"
              name={`poll-${poll._id}`}
              value={option.option}
              checked={selectedOption === option.option}
              onChange={() => setSelectedOption(option.option)}
            />
            <span className="option-text">{option.option}</span>
            {selectedOption === option.option && (
              <FontAwesomeIcon icon={faCheckCircle} className="selected-icon" />
            )}
          </label>
        )}
      </div>
    ));

  const data = {
    labels: poll.options.map(option => option.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map(option => color()),
        borderColor: '#ffffff',
        borderWidth: 2,
        data: poll.options.map(option => option.votes),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="poll">
      <div className="poll-header">
        <h2 className="poll-question">{poll.question}</h2>
        <div className="poll-meta">
          <span className="poll-author">
            by {getAuthorName()}
          </span>
          <span className="poll-date">
            {poll.createdAt ? new Date(poll.createdAt).toLocaleDateString() : ''}
          </span>
        </div>
      </div>

      <div className="poll-content">
        <div className="poll-options">
          {answers}
        </div>
        
        {!hasVoted && !hasUserVoted && (
          <button
            onClick={handleVote}
            disabled={selectedOption === null}
            className="vote-button"
          >
            <FontAwesomeIcon icon={faVoteYea} />
            <span>Cast Vote</span>
          </button>
        )}

        {(hasVoted || hasUserVoted) && (
          <div className="poll-chart">
            <Pie data={data} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
    auth: store.auth,
  }),
  { vote },
)(Poll);
