import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Callback from "./Callback";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Private from "./Private";
import Courses from "./Courses";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <div className='container'>
        <Nav className='row' auth={this.auth} />
        <div className='row'>
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
          <Route
            path='/courses'
            render={(props) =>
              this.auth.isAuthenticated() &&
              this.auth.userHasScopes(["read:courses"]) ? (
                <Courses auth={this.auth} {...props} />
              ) : (
                this.auth.login()
              )
            }
          />
        </div>
      </div>
    );
  }
}
