import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faPlus, 
  faChartBar, 
  faVoteYea, 
  faClock, 
  faShieldAlt, 
  faBolt,
  faCheckCircle,
  faTimesCircle,
  faSearch,
  faFilter,
  faSort,
  faCalendarAlt,
  faUserCircle,
  faArrowUp,
  faFire,
  faStar,
  faHeart,
  faComments,
  faShare,
  faEllipsisH,
  faList,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

// Mock data for demonstration
const mockPolls = [
  {
    id: 1,
    title: "What's your favorite programming language?",
    description: "Help us understand the developer community preferences",
    options: [
      { id: 1, text: "JavaScript", votes: 45 },
      { id: 2, text: "Python", votes: 38 },
      { id: 3, text: "Java", votes: 22 },
      { id: 4, text: "Go", votes: 15 }
    ],
    totalVotes: 120,
    createdAt: "2024-05-20",
    endDate: "2024-06-20",
    isActive: true,
    creator: "TechCorp"
  },
  {
    id: 2,
    title: "Best remote work setup?",
    description: "Share your ideal work from home configuration",
    options: [
      { id: 1, text: "Home office", votes: 67 },
      { id: 2, text: "Coffee shop", votes: 23 },
      { id: 3, text: "Co-working space", votes: 31 },
      { id: 4, text: "Outdoor space", votes: 9 }
    ],
    totalVotes: 130,
    createdAt: "2024-05-19",
    endDate: "2024-06-19",
    isActive: true,
    creator: "WorkLife Inc"
  }
];

// Enhanced Error Message Component
const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="message-container">
      <div className="error-message">
        <div className="message-content">
          <FontAwesomeIcon icon={faShieldAlt} className="message-icon" />
          <p className="message-text">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="message-close">
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </div>
    </div>
  );
};

// Enhanced Success Message Component
const SuccessMessage = ({ message, onClose }) => {
  if (!message) return null;
  
  return (
    <div className="message-container">
      <div className="success-message">
        <div className="message-content">
          <FontAwesomeIcon icon={faCheckCircle} className="message-icon" />
          <p className="message-text">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="message-close">
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </div>
    </div>
  );
};

// Enhanced Poll Card Component
const PollCard = ({ poll, onVote, hasVoted }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(hasVoted);
  const [isLiked, setIsLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleVote = () => {
    if (selectedOption !== null) {
      onVote(poll.id, selectedOption);
      setShowResults(true);
    }
  };

  const getPercentage = (votes) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0;
  };

  const getTimeRemaining = () => {
    const end = new Date(poll.endDate);
    const now = new Date();
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : 'Ending soon';
  };

  return (
    <div className="poll-card">
      <div className="poll-header">
        <div className="poll-creator">
          <FontAwesomeIcon icon={faUserCircle} className="creator-icon" />
          <span className="creator-name">{poll.creator}</span>
          <span className="poll-date">
            <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
            {poll.createdAt}
          </span>
        </div>
        <div className="poll-actions">
          <button 
            className={`action-button like-button ${isLiked ? 'active' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          <button 
            className="action-button share-button"
            onClick={() => setShowShare(!showShare)}
          >
            <FontAwesomeIcon icon={faShare} />
            <span>Share</span>
          </button>
          <button className="action-button more-button">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
      </div>

      <div className="poll-content">
        <h3 className="poll-title">{poll.title}</h3>
        <p className="poll-description">{poll.description}</p>
        
        <div className="poll-meta">
          <div className="poll-stats">
            <span className="stat-item">
              <FontAwesomeIcon icon={faUsers} />
              {poll.totalVotes} votes
            </span>
            <span className="stat-item">
              <FontAwesomeIcon icon={faComments} />
              {Math.floor(Math.random() * 20)} comments
            </span>
            <span className="stat-item">
              <FontAwesomeIcon icon={faFire} />
              Trending
            </span>
          </div>
          <div className="poll-status-container">
            <span className={`poll-status ${poll.isActive ? 'active' : 'closed'}`}>
              {poll.isActive ? 'Active' : 'Closed'}
            </span>
            {poll.isActive && (
              <span className="time-remaining">
                <FontAwesomeIcon icon={faClock} />
                {getTimeRemaining()}
              </span>
            )}
          </div>
        </div>

        <div className="poll-options">
          {poll.options.map((option) => (
            <div key={option.id} className="poll-option-wrapper">
              {showResults ? (
                <div className="poll-result">
                  <div className="result-header">
                    <span className="option-text">{option.text}</span>
                    <span className="vote-count">{option.votes} votes</span>
                  </div>
                  <div className="progress-container">
                    <div 
                      className="progress-bar"
                      style={{ width: `${getPercentage(option.votes)}%` }}
                    />
                    <span className="percentage">{getPercentage(option.votes)}%</span>
                  </div>
                </div>
              ) : (
                <label className="poll-option">
                  <input
                    type="radio"
                    name={`poll-${poll.id}`}
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                  />
                  <span className="option-text">{option.text}</span>
                  {selectedOption === option.id && (
                    <FontAwesomeIcon icon={faCheckCircle} className="selected-icon" />
                  )}
                </label>
              )}
            </div>
          ))}
        </div>

        {!showResults && poll.isActive && (
          <button
            onClick={handleVote}
            disabled={selectedOption === null}
            className="vote-button"
          >
            <FontAwesomeIcon icon={faVoteYea} />
            <span>Cast Vote</span>
          </button>
        )}

        {showResults && (
          <div className="poll-actions-footer">
            <button
              onClick={() => setShowResults(false)}
              className="action-button"
            >
              <FontAwesomeIcon icon={faChartBar} />
              <span>Hide Results</span>
            </button>
            <button className="action-button">
              <FontAwesomeIcon icon={faComments} />
              <span>Comment</span>
            </button>
            <button className="action-button">
              <FontAwesomeIcon icon={faShare} />
              <span>Share</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Create Poll Modal
const CreatePollModal = ({ isOpen, onClose, onCreatePoll }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [endDate, setEndDate] = useState('');

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (title && description && options.every(opt => opt.trim()) && endDate) {
      onCreatePoll({
        title,
        description,
        options: options.map((text, id) => ({ id: id + 1, text, votes: 0 })),
        endDate
      });
      setTitle('');
      setDescription('');
      setOptions(['', '']);
      setEndDate('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Create New Poll</h2>
          <button onClick={onClose} className="modal-close">
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>

        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faChartBar} className="label-icon" />
              Poll Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Enter an engaging poll title..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faComments} className="label-icon" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input form-textarea"
              placeholder="Provide context for your poll..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faList} className="label-icon" />
              Options
            </label>
            <div className="options-container">
              {options.map((option, index) => (
                <div key={index} className="option-group">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="form-input option-input"
                    placeholder={`Option ${index + 1}...`}
                    required
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="remove-option"
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                className="add-option"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Add Option</span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faCalendarAlt} className="label-icon" />
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="modal-button cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-button submit"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Create Poll</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
const VotingApp = () => {
  const [polls, setPolls] = useState(mockPolls);
  const [votedPolls, setVotedPolls] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, closed
  const pollsGridRef = useRef(null);

  useEffect(() => {
    // Clear messages after 5 seconds
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleVote = (pollId, optionId) => {
    setPolls(prevPolls =>
      prevPolls.map(poll =>
        poll.id === pollId
          ? {
              ...poll,
              options: poll.options.map(option =>
                option.id === optionId
                  ? { ...option, votes: option.votes + 1 }
                  : option
              ),
              totalVotes: poll.totalVotes + 1
            }
          : poll
      )
    );
    setVotedPolls(prev => new Set([...prev, pollId]));
    setSuccessMessage('Your vote has been recorded successfully!');
  };

  const handleCreatePoll = (newPollData) => {
    const newPoll = {
      id: polls.length + 1,
      ...newPollData,
      totalVotes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
      creator: 'You'
    };
    setPolls([newPoll, ...polls]);
    setSuccessMessage('Poll created successfully!');
  };

  const filteredPolls = polls.filter(poll => {
    if (filter === 'active') return poll.isActive;
    if (filter === 'closed') return !poll.isActive;
    return true;
  });

  const stats = {
    totalPolls: polls.length,
    activePolls: polls.filter(p => p.isActive).length,
    totalVotes: polls.reduce((sum, poll) => sum + poll.totalVotes, 0)
  };

  const scrollPolls = (direction) => {
    if (pollsGridRef.current) {
      const scrollAmount = 400; // Width of a poll card + gap
      const currentScroll = pollsGridRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      pollsGridRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="voting-app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-logo">
              <FontAwesomeIcon icon={faChartBar} className="header-logo-icon" />
              <h1 className="header-title">VotePlatform</h1>
            </div>
            <div className="header-actions">
              <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input type="text" placeholder="Search polls..." />
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="create-poll-button"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Create Poll</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">Make Your Voice Heard</h2>
            <p className="hero-description">
              Create engaging polls, gather opinions, and make data-driven decisions with our powerful voting platform
            </p>
            <div className="hero-actions">
              <button
                onClick={() => setShowCreateModal(true)}
                className="hero-button primary"
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Create Poll</span>
              </button>
              <button className="hero-button secondary">
                <FontAwesomeIcon icon={faChartBar} />
                <span>View Trends</span>
              </button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stats-grid">
              <div className="stats-card">
                <FontAwesomeIcon icon={faChartBar} className="stats-icon" />
                <div className="stats-value">{stats.totalPolls}</div>
                <div className="stats-label">Total Polls</div>
                <div className="stats-trend up">
                  <FontAwesomeIcon icon={faArrowUp} />
                  <span>12% this week</span>
                </div>
              </div>
              <div className="stats-card">
                <FontAwesomeIcon icon={faBolt} className="stats-icon" />
                <div className="stats-value">{stats.activePolls}</div>
                <div className="stats-label">Active Polls</div>
                <div className="stats-trend up">
                  <FontAwesomeIcon icon={faArrowUp} />
                  <span>8% this week</span>
                </div>
              </div>
              <div className="stats-card">
                <FontAwesomeIcon icon={faUsers} className="stats-icon" />
                <div className="stats-value">{stats.totalVotes}</div>
                <div className="stats-label">Total Votes</div>
                <div className="stats-trend up">
                  <FontAwesomeIcon icon={faArrowUp} />
                  <span>24% this week</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Messages */}
        <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />
        <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />

        {/* Filter Section */}
        <section className="filter-section">
          <div className="filter-container">
            <div className="filter-tabs">
              {[
                { key: 'all', label: 'All Polls', icon: faChartBar },
                { key: 'active', label: 'Active', icon: faBolt },
                { key: 'closed', label: 'Closed', icon: faClock },
                { key: 'trending', label: 'Trending', icon: faFire },
                { key: 'popular', label: 'Popular', icon: faStar }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
                >
                  <FontAwesomeIcon icon={tab.icon} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="filter-actions">
              <button className="filter-action">
                <FontAwesomeIcon icon={faSort} />
                <span>Sort</span>
              </button>
              <button className="filter-action">
                <FontAwesomeIcon icon={faFilter} />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </section>

        {/* Polls Section */}
        <section className="polls-section">
          <button 
            className="scroll-button prev"
            onClick={() => scrollPolls('left')}
            aria-label="Scroll left"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <div className="polls-grid" ref={pollsGridRef}>
            {filteredPolls.length > 0 ? (
              filteredPolls.map((poll) => (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  onVote={handleVote}
                  hasVoted={votedPolls.has(poll.id)}
                />
              ))
            ) : (
              <div className="empty-state">
                <FontAwesomeIcon icon={faChartBar} className="empty-state-icon" />
                <h3 className="empty-state-title">No polls found</h3>
                <p className="empty-state-description">
                  {filter === 'all' 
                    ? "Be the first to create a poll and start gathering opinions!" 
                    : `No ${filter} polls available at the moment.`}
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="create-poll-button"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Create Your First Poll</span>
                </button>
              </div>
            )}
          </div>

          <button 
            className="scroll-button next"
            onClick={() => scrollPolls('right')}
            aria-label="Scroll right"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </section>
      </main>

      {/* Create Poll Modal */}
      <CreatePollModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePoll={handleCreatePoll}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-title">VotePlatform</h3>
              <p className="footer-description">
                The most powerful and user-friendly voting platform for gathering opinions and making data-driven decisions.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-subtitle">Resources</h4>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#api">API Docs</a></li>
                <li><a href="#status">Status</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-subtitle">Legal</h4>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
                <li><a href="#gdpr">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-text">&copy; 2024 VotePlatform. All rights reserved.</p>
            <p className="footer-subtext">Secure, reliable, and easy-to-use voting platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VotingApp;