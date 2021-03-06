import React, { Component } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "../../CSS/orgFeed.css"
import DeclinedPings from "./DeclinedPings";

// child of OrgFeed component
export default class OrgPingHistory extends Component {
  constructor() {
    super();
    this.state = {
      pings: [],
      declined: [],
      expired: []
    }
  }

  componentDidMount() {
    this.getPings()
  }

  getPings = () => {
    axios
      .get("/users/getPingsSentToOrg")
      .then(res => {
        let declined = [];
        res.data.map(ping => {
          if (ping.accepted === false) {
            declined.push(ping)
          }
        })
        this.setState({
          pings: res.data,
          declined: declined,
        })
      })
      .catch(err => {
        this.setState({
          message: "No ping requests found."
        })
      })
  }

  // TODO: ADD renderExpired pings!!!

  renderDeclined = () => {
    return <DeclinedPings
              declined={this.state.declined} />
  }

  render() {
    const { declined, expired } = this.state;

    return (
      <div className="org-feed-parent">
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="single-tab header">Declined</Tab>
            <Tab className="single-tab header">Expired</Tab>
          </TabList>
      
          <TabPanel>
            <div className="org-feed-pings-div">
              {
                declined[0] ? 
                <DeclinedPings declined={this.state.declined} />
                : <h3>No volunteers declined yet!</h3>
              }
            </div>
          </TabPanel>
          <TabPanel>
            <h2 className="header">This feature is coming soon!</h2>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}