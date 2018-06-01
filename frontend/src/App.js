import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import axios from "axios";

import "./CSS/app.css";

import Login from "./users/Login";
import Register from "./users/Register";
import Logout from "./users/Logout";
import VolunteerFeed from "./users/volunteer/VolunteerFeed";
import PingHistory from "./users/volunteer/PingHistory";
import OrgFeed from "./users/org/OrgFeed";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null, // { id, username, org, message }
      activeUser: false
    };
  }


  componentDidMount() {
    this.setUser()
  }

  // --------------- Helper Functions --------------- //
  setUser = () => {
    // Call to grab user type from db and set it to `user` in state
    axios
      .get("/users/getUser")
      .then(res => {
        this.setState({
          user: res.data.user,
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
  renderFeed = () => {
    const { user } = this.state;
    // Check for an active user
    if (!user) { 
      return <h2>You must login first!</h2>
    }

    if (user.org === true) { // Org logged in
      return <OrgFeed user={user} />
    } else if (user.org === false) { // Volunteer logged in
      return <VolunteerFeed user={this.state.user} />
    }
  }
  renderPingHistory = () => {
    const { user } = this.state;
    if (!user) { 
      return <h2>You must login first!</h2>
    }
    
    if (user.org === false) { // Volunteer logged in
      return <PingHistory user={user} />
    } else if (user.org === true) {
      return <h3 className="error-message">You must be a volunteer to view this page.</h3>
    }
  }

  render() {
    const { user, activeUser } = this.state;

    return (
      <div className="app">
        <nav>
          { activeUser ? "" : <div className="nav-link-container"><Link to="/login">Login</Link></div> }
          { activeUser ? "" : <div className="nav-link-container"><Link to="/register">Register</Link></div> }
          { activeUser ? <div className="nav-link-container"><Link to="/home">Home</Link></div> : "" }
          { activeUser ? <div className="nav-link-container"><Link to="/history">Ping History</Link></div> : "" }
          { user ? <div className="nav-link-container"><Link to="/logout">Logout</Link></div> : "" }
        </nav>

        <Switch>
          <Route path="/login" render={ this.renderLogin } />
          <Route path="/register" component={ Register } />
          <Route path="/home" render={ this.renderFeed } />
          <Route path="/history" render={ this.renderPingHistory } />
          <Route path="/logout" render={ this.renderLogout } />
        </Switch>
      </div>
    );
  }
}

export default App;
