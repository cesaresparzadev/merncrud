import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    return (
      <nav className='navbar navbar-expand-lg navbar-light'>
        <button className='navbar-toggler'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav'>
            <li className='nav-item p-3'>
              <Link to='/'>Home</Link>
            </li>
            <li className='nav-item p-3'>
              {isAuthenticated() ? <Link to='/profile'>Profile</Link> : ""}
            </li>
            <li className='nav-item p-3'>
              <Link to='/public'>Public</Link>
            </li>
            <li className='nav-item p-3'>
              {isAuthenticated() ? <Link to='/private'>Private</Link> : ""}
            </li>
          </ul>
        </div>
        <button
          className='float-right'
          onClick={isAuthenticated() ? logout : login}
        >
          {isAuthenticated() ? "Log Out" : "Log In"}
        </button>
      </nav>
    );
  }
}
