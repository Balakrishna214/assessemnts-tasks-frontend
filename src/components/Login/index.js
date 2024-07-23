import Cookies from 'js-cookie';
import React, { Component } from 'react';
import './index.css';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
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
    const { username, password } = this.state;

    try {
      const response = await fetch('http://localhost:3008/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          username: '',
          password: '',
          error: '',
        });

        this.onSubmitSuccess(data.token);
      } else {
        const errorMessage = await response.text();
        this.setState({ error: errorMessage || 'Error logging in' });
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Error logging in' });
    }
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} className="login-form">
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
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit">Login</button>
          <p>
            Not a member? <a href="/register">Register if you are a new user</a>
          </p>
        </form>
      </div>
    );
  }
}

export default  LoginForm;
