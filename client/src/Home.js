import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    const { isAuthenticated, logout, login } = this.props.auth;
    return (
      <div className='mx-auto'>
        <h1>MERN CRUD Template</h1>
      </div>
    );
  }
}
