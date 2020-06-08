import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Callback from "./Callback";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Private from "./Private";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <div className='container'>
        <Nav auth={this.auth} />
        <Route
          path='/'
          exact
          render={(props) => <Home auth={this.auth} {...props} />}
        />
        <Route
          path='/callback'
          render={(props) => <Callback auth={this.auth} {...props} />}
        />
        <Route
          path='/profile'
          render={(props) =>
            this.auth.isAuthenticated() ? (
              <Profile auth={this.auth} {...props} />
            ) : (
              <Redirect to='/' />
            )
          }
        />
        <Route
          path='/private'
          render={(props) =>
            this.auth.isAuthenticated() ? (
              <Private auth={this.auth} {...props} />
            ) : (
              this.auth.login()
            )
          }
        />
      </div>
    );
  }
}
