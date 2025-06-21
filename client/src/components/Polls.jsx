import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPolls, getUserPolls } from '../store/actions';
import './Polls.css';

const Polls = ({ getPolls, getUserPolls, auth, polls }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getPolls();
  }, [getPolls]);

  const handleSelect = (id) => {
    navigate(`/poll/${id}`);
  };

  const getAuthorName = (poll) => {
    if (!poll.author) return 'Anonymous';
    return poll.author.username || 'Anonymous';
  };

  return (
    <div className="polls-container animate-fade-in">
      {auth.isAuthenticated && (
        <div className="polls-filter animate-slide-down">
          <button 
            className="filter-button"
            onClick={getPolls}
          >
            All polls
          </button>
          <button 
            className="filter-button"
            onClick={getUserPolls}
          >
            My polls
          </button>
        </div>
      )}
      
      <div className="polls-grid">
        {polls.length > 0 ? (
          polls.map((poll, index) => (
            <div
              className="poll-card animate-slide-up"
              onClick={() => handleSelect(poll._id)}
              key={poll._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="poll-content">
                <h3 className="poll-question">
                  {poll.question}
                </h3>
                <div className="poll-meta">
                  <span className="poll-date">
                    {new Date(poll.createdAt).toLocaleDateString()}
                  </span>
                  <span className="poll-author">
                    by {getAuthorName(poll)}
                  </span>
                </div>
              </div>
              <div className="poll-arrow">
                →
              </div>
            </div>
          ))
        ) : (
          <div className="no-polls animate-fade-in">
            <p>No polls available. Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(
  store => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls },
)(Polls);
