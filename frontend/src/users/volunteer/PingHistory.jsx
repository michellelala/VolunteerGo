import React, { Component } from "react";
import axios from "axios";

export default class PingHistory extends Component {
  

    render() {
      const { user } = this.props;
      return (
        <div>
          <h3>Ping History goes here!</h3>
        </div>
      )
    
  }
}