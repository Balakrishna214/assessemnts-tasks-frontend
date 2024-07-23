import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; // Import the CSS for popup
import './index.css'; // Ensure to create this CSS file for styling

class TasksPage extends Component {
  state = {
    username: '',
    publishedUrl: '',
    driveLink: '',
    error: '',
    selectedTask: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, publishedUrl, driveLink, selectedTask } = this.state;
  
    if (!username || !publishedUrl || !driveLink || !selectedTask) {
      this.setState({ error: 'All fields are required' });
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3008/submit-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, publishedUrl, driveLink, taskId: selectedTask }),
      });
  
      if (response.ok) {
        this.setState({ error: '' });
        this.closeModal(); // Assuming this closes the popup/modal
      } else {
        const errorMessage = await response.text();
        this.setState({ error: errorMessage || 'Error submitting assignment' });
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Error submitting assignment' });
    }
  };
  

  openModal = (taskId) => {
    this.setState({ selectedTask: taskId });
  };

  closeModal = () => {
    this.setState({ selectedTask: null, username: '', publishedUrl: '', driveLink: '', error: '' });
  };

  render() {
    const { username, publishedUrl, driveLink, error, selectedTask } = this.state;

    return (
      <div className="tasks-page">
        <h1>Assessments Tasks</h1>
        <div className="tasks-container">
          {[1, 2, 3].map((taskId) => (
            <div key={taskId} className="task-card">
              <div className="task-title">Task {taskId}</div>
              <button className="submit-button" onClick={() => this.openModal(taskId)}>Submit</button>
            </div>
          ))}
        </div>

        <Popup open={!!selectedTask} onClose={this.closeModal} className="modal">
          <div className="modal-content">
            <h2>Assignment Submission</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={this.handleSubmit} className='form'>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label>
                Published URL:
                <input
                  type="text"
                  name="publishedUrl"
                  value={publishedUrl}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label>
                Drive Link:
                <input
                  type="text"
                  name="driveLink"
                  value={driveLink}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
            <button onClick={this.closeModal} className="close-button">Close</button>
          </div>
        </Popup>
      </div>
    );
  }
}

export default TasksPage;
