import React, { Component } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Accepted from "./Accepted";
import Pending from "./Pending";
import Declined from "./Declined";

import "../../../CSS/volHistory.css"

export default class PingHistory extends Component {
  state = {
    history: [],
    message: "",
    accepted: [],
    pending: [],
    declined: []
  }

  componentDidMount() {
    const { user } = this.props;

    axios
      .get("/users/getPingsSentByVolunteer")
      .then(res => {
        let accepted = []
        let declined = []
        let pending = []
        res.data.map(ping => {
          if (ping.accepted === true) {
            accepted.push(ping)
          } else if (ping.accepted === false) {
            declined.push(ping)
          } else {
            pending.push(ping)
          }
        })

        this.setState({
          history: res.data,
          accepted: accepted,
          declined: declined,
          pending: pending
        })
      })
      .catch(err => {
        this.setState({
          message: "Error retrieving your ping history.", err
        })
      })
  }


  render() {
    const { user } = this.props;
    const { history, message, accepted, pending, declined } = this.state;

    return (
      <div className="vol-history-parent">

        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="single-tab header">Accepted</Tab>
            <Tab className="single-tab header">Pending</Tab>
            <Tab className="single-tab header">Declined</Tab>
          </TabList>
      
          <TabPanel>
            <div className="vol-history-pings">
              <Accepted accepted={accepted} />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="vol-history-pings">
              <Pending pending={pending} />
            </div>
          </TabPanel>

          <TabPanel>
          <div className="vol-history-pings">
              <Declined declined={declined} />
            </div>
          </TabPanel>
        </Tabs>

        <div className="error-message"> {message} </div>
      </div>
    )
    
  }
}