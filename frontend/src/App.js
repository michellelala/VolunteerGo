import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from "axios";

import './App.css';

import Login from "./users/Login"
import Register from "./users/Register"
import Logout from "./users/Logout"

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null, // { id, username }
      activeUser: false
    };
  }

  // --------------- Helper Functions --------------- //
  setUser = user => {
    // Call to grab user type from db and set it to `user` in state
    axios
      .get("/users/getUser")
      .then(res => {
        this.setState({
          user: {...user, org: res.data.user.org},
          activeUser: true
        });
      })
  };

  logoutUser = () => {
    axios
        .get("/users/logout")
        .then(res => {
          this.setState({
            user: null,
            activeUser: false
          });
        });
  }

  // --------------- Rendering things --------------- //
  renderLogin = () => {
    return <Login user={this.state.user} setUser={this.setUser} />
  }

  renderLogout = () => {
    return <Logout user={this.state.user} logoutUser={this.logoutUser} />
  }

  render() {
    console.log("App state: ", this.state)

    return (
      <div>
        <nav>
          <Link to="/login">Login</Link>{" . "}
          <Link to="/register">Register</Link>{" . "}
          <Link to="/logout">Logout</Link>{" "}
        </nav>

        <Switch>
          <Route path="/login" render={ this.renderLogin } />
          <Route path="/register" component={ Register } />
          <Route path="/logout" render={ this.renderLogout } />
        </Switch>
      </div>
    );
  }
}

export default App;
