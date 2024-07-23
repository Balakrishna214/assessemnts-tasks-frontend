import React, { Component } from 'react';
import Cookie from 'js-cookie'
import { Link,withRouter } from "react-router-dom";

import { FaBars, FaTimes } from 'react-icons/fa';
import './index.css'; // Ensure to create this CSS file for styling

class Header extends Component {
  state = {
    isOpen: false,
  };

  toggleMenu = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

   onClickLogout = () => {
    Cookie.remove("jwt_token");
    const { history } = this.props;
    history.replace("/login");
  };

  render() {
    const { isOpen } = this.state;

    return (
      <header className="header">
        <div className="logo">
          <img src="path/to/logo.png" alt="Logo" /> {/* Replace with your logo */}
        </div>
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <ul>
            <Link to="/"><li><a href="/">Home</a></li></Link>
            <Link to="/about"><li><a href="/about">About</a></li></Link>
            <Link to="/contact"><li><a href="/contact">Contact</a></li></Link>
           <li><button className="logout-button"  type="button"
         
          onClick={this.onClickLogout}>Logout</button></li> 
          </ul>
        </nav>
        <div className="menu-icon" onClick={this.toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
