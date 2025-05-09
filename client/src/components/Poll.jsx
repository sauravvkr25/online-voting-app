import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { vote } from '../store/actions';
import { color } from '../services/color';
import './Poll.css';

const Poll = ({ poll, vote }) => {
  const getAuthorName = () => {
    if (!poll || !poll.author) return 'Anonymous';
    return poll.author.username || 'Anonymous';
  };

  const answers =
    poll.options &&
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        className="poll-option"
        key={option._id}
      >
        <span className="option-text">{option.option}</span>
        <span className="option-votes">{option.votes} votes</span>
      </button>
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
        
        <div className="poll-chart">
          <Pie data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
  }),
  { vote },
)(Poll);
