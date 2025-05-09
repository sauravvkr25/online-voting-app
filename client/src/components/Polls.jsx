import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPolls, getUserPolls } from '../store/actions';
import './Polls.css';

class Polls extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/poll/${id}`);
  }

  getAuthorName(poll) {
    if (!poll.author) return 'Anonymous';
    return poll.author.username || 'Anonymous';
  }

  render() {
    const { getPolls, getUserPolls, auth } = this.props;

    const polls = this.props.polls.map(poll => (
      <div 
        className="poll-card" 
        onClick={() => this.handleSelect(poll._id)} 
        key={poll._id}
      >
        <div className="poll-content">
          <h3 className="poll-question">{poll.question}</h3>
          <div className="poll-meta">
            <span className="poll-date">
              {new Date(poll.createdAt).toLocaleDateString()}
            </span>
            <span className="poll-author">
              by {this.getAuthorName(poll)}
            </span>
          </div>
        </div>
        <div className="poll-arrow">→</div>
      </div>
    ));

    return (
      <div className="polls-container">
        {auth.isAuthenticated && (
          <div className="polls-filter">
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
          {polls.length > 0 ? polls : (
            <div className="no-polls">
              <p>No polls available. Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  store => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls },
)(Polls);
