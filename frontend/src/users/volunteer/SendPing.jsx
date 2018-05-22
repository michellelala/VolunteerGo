import React, { Component } from "react";
import axios from "axios";

export default class SendPing extends Component {
  state = {
    orgId: "",
    timeSent: "",
    startTime: "",
    duration: "",
    message: ""
  }

  handleSendPing = (e) => {
    e.preventDefault()
    const { orgId, timeSent, startTime, duration } = this.state;
    let currentTime = new Date().toString()
    
    axios
      .post("/users/sendPing", {
        orgId: orgId,
        timeSent: currentTime,
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
    const startTimes = ["7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"]
    const durationArr = ["0-1 hour", "1-2 hours", "3-4 hours", "4+ hours", "As long as needed"]
    // console.log("sendping state: ", this.state)
    return (
      <div>
        <h1>You're in the SendPing component</h1>

        <form onSubmit={this.handleSendPing}>
          <p>What time are you available to start? {" "}
            <select name="startTime" onChange={this.handleInputChange}>
              {["", ...startTimes].map(hr => {
                return <option value={hr} key={hr}>{hr}</option>
              })}
            </select>
          </p>
          <p>For how long are you available? {" "}
            <select name="duration" onChange={this.handleInputChange}>
              {["", ...durationArr].map(timeOption => {
                return <option value={timeOption} key={timeOption}>{timeOption}</option>
              })}
            </select>
          </p>
          <input type="submit" value="Send Ping!" />
        </form>
        
      </div>
    )
  }
}