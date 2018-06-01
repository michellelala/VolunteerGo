import React, { Component } from "react";
import axios from "axios";

export default class PingHistory extends Component {
  state = {
    history: [],
    message: ""
  }

  componentDidMount() {
    const { user } = this.props;
    
    if (!user.org) { // Volunteer
      axios
        .get("/users/getPingsSentByVolunteer")
        .then(res => {
          this.setState({
            history: res.data
          })
        })
        .catch(err => {
          this.setState({
            message: "Error retrieving your ping history."
          })
        })
    }
  }


  render() {
    const { user } = this.props;
    const { history, message } = this.state;
    console.log(history)

    return (
      <div>
        <div className="error-message"> {message} </div>
        {
          history.map(ping => {
            return (
              <div key={ping.time_sent}>
                <h4>{ping.time_sent.slice(0, 21)}</h4>
                {ping.name}<br />
                Start: {ping.start_time}<br />
                Duration: {ping.duration}<br />
                Accepted: {ping.accepted ? "Yes" : "Pending"}
              </div>
            )
          })
        }
      </div>
    )
  
  }
}