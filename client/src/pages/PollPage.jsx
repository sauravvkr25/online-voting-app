import React from 'react';
import { useParams } from 'react-router-dom';
import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';
import './PollPage.css';

const PollPage = ({ getPoll, poll }) => {
  const { id } = useParams();
  
  React.useEffect(() => {
    getPoll(id);
  }, [getPoll, id]);

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
