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
        {pings[0] ? <h3>Accepted</h3> : <h3>No pings yet</h3> }
        <div className="org-feed-accepted-pings">
            {
              pings.map(ping => {
                if (ping.accepted) {
                  return (
                  <div name={ping.id} className="org-feed-ping-div">
                    {ping.name}<br />
                    @{ping.username}<br />
                    Sent at: {ping.time_sent}<br />
                    Start time: {ping.start_time}<br />
                    Available for: {ping.duration}<br />
                  </div>
                )
              }
            })
          }
        </div>

        {pings[0] ? <h3>Pending</h3> : ""}
        <div className="org-feed-pending-pings">
            {
                pings.map(ping => {
                  if (!ping.accepted) {
                    return (
                      <div name={ping.id} className="org-feed-ping-div" key={ping.name}>
                        {ping.name}<br />
                        @{ping.username}<br />
                        Sent at: {ping.time_sent}<br />
                        Start time: {ping.start_time}<br />
                        Available for: {ping.duration}<br />
                      </div>
                    )
                  }
                })
            }
        </div>
      </div>
    )
  }
}