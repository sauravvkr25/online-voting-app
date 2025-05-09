import React from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Polls from '../components/Polls';
import './HomePage.css';

const HomePage = props => (
  <div className="home-container">
    <div className="hero-section">
      <h1>Welcome to Online Voting</h1>
      <p>Create, share, and participate in polls with ease</p>
    </div>
    <ErrorMessage />
    <div className="polls-section">
      <Polls {...props} />
    </div>
  </div>
);

export default HomePage;
