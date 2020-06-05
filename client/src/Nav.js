import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav className='navbar'>
        <ul className='navbar-nav form-inline'>
          <li className='nav-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/profile'>Profile</Link>
          </li>
          <li className='nav-item'>
            <button onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
