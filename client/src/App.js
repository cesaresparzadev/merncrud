import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "./AuthContext";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false,
    };
  }

  componentDidMount() {
    this.state.auth.renewToken(() =>
      this.setState({ tokenRenewalComplete: true })
    );
  }

  render() {
    const { auth } = this.state;
    if (!this.state.tokenRenewalComplete) return "Loading...";
    return (
      <AuthContext.Provider value={auth}>
        <div className='container'>
          <Nav className='row' auth={auth} />
          <div className='row'>
            <Route
              path='/'
              exact
              render={(props) => <Home auth={auth} {...props} />}
            />
            <Route
              path='/callback'
              render={(props) => <Callback auth={auth} {...props} />}
            />
            <PrivateRoute path='/profile' component={Profile} />
            <PrivateRoute path='/private' component={Private} />
            <PrivateRoute
              path='/courses'
              component={Courses}
              scopes={["read:courses"]}
            />
          </div>
        </div>
      </AuthContext.Provider>
    );
  }
}
