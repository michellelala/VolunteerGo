import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
// import axios from "axios";

import './App.css';

import Login from "./users/Login"
import Register from "./users/Register"

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null, // { id, username }
      activeUser: false
    };
  }


  setUser = user => {
    this.setState({
      user: user,
      activeUser: true
    });
  };

  renderLogin = () => {
    return <Login user={this.state.user} setUser={this.setUser} />
  }


  render() {
    console.log("App state: ", this.state)

    return (
      <div>
        <h1>HELLOOOOOO, you're in the App component. COOL.</h1>

        <nav>
          <Link to="/login">Login</Link>{" "}
          <Link to="/register">Register</Link>
        </nav>

        <Switch>
          <Route path="/login" render={ this.renderLogin } />
          <Route path="/register" component={ Register } /> 
        </Switch>
      </div>
    );
  }
}

export default App;
