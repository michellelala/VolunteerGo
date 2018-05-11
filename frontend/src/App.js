import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';

import Login from "./users/Login";

class App extends Component {

  renderLogin = () => {
    return <Login />
  }

  render() {
    return (
      <div>
        <h1>YELLOOOO, you're in App.</h1>
        <nav>
          <Link to="/login">Login</Link>

        </nav>

        <Switch>
          <Route path="/login" render={this.renderLogin} />
        </Switch>
      </div>
    );
  }
}

export default App;
