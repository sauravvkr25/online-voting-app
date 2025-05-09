import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../store/actions';
import './CreatePoll.css';

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      options: ['', ''],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addAnswer() {
    this.setState({ options: [...this.state.options, ''] });
  }

  removeOption(index) {
    if (this.state.options.length > 2) {
      const options = [...this.state.options];
      options.splice(index, 1);
      this.setState({ options });
    }
  }

  handleAnswer(e, index) {
    const options = [...this.state.options];
    options[index] = e.target.value;
    this.setState({ options });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPoll(this.state);
  }

  render() {
    const options = this.state.options.map((option, i) => (
      <div key={i} className="option-container">
        <div className="option-input-wrapper">
          <input
            className="option-input"
            type="text"
            placeholder={`Option ${i + 1}`}
            value={option}
            onChange={e => this.handleAnswer(e, i)}
          />
          {this.state.options.length > 2 && (
            <button
              type="button"
              className="remove-option"
              onClick={() => this.removeOption(i)}
            >
              ×
            </button>
          )}
        </div>
      </div>
    ));

    return (
      <form className="create-poll-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="question">
            Your Question
          </label>
          <input
            className="form-input"
            type="text"
            name="question"
            id="question"
            placeholder="What would you like to ask?"
            value={this.state.question}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Options</label>
          <div className="options-list">{options}</div>
          <button
            type="button"
            className="add-option-button"
            onClick={this.addAnswer}
          >
            <span className="button-icon">+</span>
            Add Option
          </button>
        </div>

        <div className="form-actions">
          <button className="submit-button" type="submit">
            Create Poll
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), { createPoll })(CreatePoll);
