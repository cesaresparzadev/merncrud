import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    const { isAuthenticated, logout, login } = this.props.auth;
    return (
      <div>
        <h1>Home</h1>
        <button onClick={isAuthenticated() ? logout : login}>
          {isAuthenticated() ? "Log Out" : "Log In"}
        </button>
      </div>
    );
  }
}
