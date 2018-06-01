import React, { Component } from "react";
import axios from "axios";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "../../CSS/orgFeed.css";

export default class OrgFeed extends Component {
  state = {
    pings: [],
    accepted: [],
    pending: [],
    selectedId: "",
    message: ""
  }

  componentDidMount() {
    this.getPings()
  }

  getPings = () => {
    axios
      .get("/users/getPingsSentToOrg")
      .then(res => {
        // console.log("ALL PINGS SENT: ", res.data)
        this.setState({
          pings: res.data
        })
      })
      .catch(err => {
        this.setState({
          message: "No ping requests found."
        })
      })
  }

  
  handleAcceptPing = (e) => {
    // console.log("id: ", e.target.id)
    axios
      .put("/users/acceptPing", {
        pingId: e.target.id
      })
      .then(() => {
        this.setState({
          selectedId: "",
          message: "You've accepted this volunteer."
        })
      })
      .then(
        this.getPings()
      )
  }

  render() {
    const { pings, selectedId } = this.state;
    // console.log(this.state.selectedId)
    // console.log(pings)

    return (
      <div>
        {pings[0] ? <h3>Accepted</h3> : <h3>No pings yet</h3> }
        <div className="org-feed-accepted-pings">
            {
              pings.map(ping => {
                if (ping.accepted) {
                  return (
                    <div name={ping.ping_id} className="each-ping" key={ping.username}>
                      {ping.name} {" "} (@{ping.username})<br />
                      Sent at: {ping.time_sent.slice(0, 21)}<br />
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
                console.log(ping.ping_id)
                return (
                  <div name={ping.ping_id} className="each-ping">
                    {ping.name} {" "} (@{ping.username})<br />
                    Sent at: {ping.time_sent.slice(0, 21)}<br />
                    Start time: {ping.start_time}<br />
                    Available for: {ping.duration}<br />
                    <button className="accept-decline-ping" onClick={this.handleDeclinePing} id={ping.ping_id}>
                      &#10005;
                    </button>
                    <button className="accept-decline-ping" onClick={this.handleAcceptPing} id={ping.ping_id}>
                      &#10004;
                    </button>
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