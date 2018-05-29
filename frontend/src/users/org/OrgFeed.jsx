import React, { Component } from "react";
import axios from "axios";

import "../../CSS/orgFeed.css";

export default class OrgFeed extends Component {
  state = {
    pings: [],
    accepted: [],
    pending: []
  }

  componentDidMount() {
    axios
      .get("/users/getPingsSentToOrg")
      .then(res => {
        console.log("ALL PINGS SENT TO THIS ORG: ", res.data)
        this.setState({
          pings: res.data
        })
      })
      .then(() => {
        const { pings } = this.state;
        pings.map(ping => {
          if (ping.accepted) {
            
          }
        })
      })
  }
  
  acceptPing = (e) => {
    axios
      .put("/users/acceptPing")
      .then()
  }

  render() {
    const { pings } = this.state;

    return (
      <div>
        <h2> You're in the organization feed. </h2>
        <div className="org-feed-ping-container">
          {
            pings.map(ping => {
              return (
                <div name={ping.id} className="org-feed-ping-div">
                  Volunteer Name: {ping.name}<br />
                  Volunteer Username: {ping.username}<br />
                  Sent At: {ping.time_sent}<br />
                  Can Start At: {ping.start_time}<br />
                  For: {ping.duration}<br />
                  {ping.accepted ? "You accepted this request." : "You have not accepted this request yet."}<br />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}