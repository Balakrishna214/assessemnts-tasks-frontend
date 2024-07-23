import Cookies from 'js-cookie'
import React, { Component } from 'react';
 
import './index.css';

class RegistrationForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitSuccess = (token) => {
    const { history } = this.props;
    Cookies.set('jwt_token', token, { expires: 30 });
    history.replace('/');  
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    // Validate password length and match
    if (password.length < 8) {
      this.setState({ error: 'Password must be at least 8 characters long' });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3008/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      const data =await response.json()
      if (response.ok) {
        alert('User registered successfully');
        this.setState({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          error: '',
        });
        this.onSubmitSuccess(data.token);
      } else {
        const errorMessage = await response.text();
        this.setState({ error: errorMessage || 'Error registering user' });
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Error registering user' });
    }
  };

  render() {
    const { username, email, password, confirmPassword, error } = this.state;

    return (
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit} className="registration-form">
          {error && <div className="error-message">{error}</div>}
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
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
