import React, { Component } from "react";
import axios from "axios";

import "../../CSS/sendPing.css";

export default class SendPing extends Component {
  constructor() {
    super()

    this.state = {
      timeSent: "",
      startTime: "",
      duration: "",
      message: ""
    }
  }

  handleSendPing = (e) => {
    e.preventDefault()
    const { startTime, duration } = this.state;
    const { selectedOrg } = this.props;
    
    axios
      .post("/users/sendPing", {
        orgId: selectedOrg.id,
        startTime: startTime,
        duration: duration
      })
      .then(() => {
        this.setState({
          message: "Successfully sent ping!"
        })
      })
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const startTimes = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"]
    const durationArr = ["0-1 hour", "1-2 hours", "3-4 hours", "4+ hours", "As long as needed"]
    const { selectedOrg } = this.props;
    
    console.log("SendPing state: ", this.state)

    return (
      <div className="send-ping-parent-container">
        <h3>You've selected: {selectedOrg.name}</h3>

        <form onSubmit={this.handleSendPing} className="send-ping-form">
          <p>What time are you available to start?</p>
          <select name="startTime" onChange={this.handleInputChange}>
            {["", ...startTimes].map(hr => {
              return <option value={hr} key={hr}>{hr}</option>
            })}
          </select>
      
          <p>For how long are you available?</p>
          <select name="duration" onChange={this.handleInputChange}>
            {["", ...durationArr].map(timeOption => {
              return <option value={timeOption} key={timeOption}>{timeOption}</option>
            })}
          </select>
          
          <input type="submit" value="Send" className="send-ping-submit" />
        </form>

        {this.state.message}
        
      </div>
    )
  }
}