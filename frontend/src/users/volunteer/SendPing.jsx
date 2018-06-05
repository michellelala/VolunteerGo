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
      message: "",
      hour: "",
      min: "",
      timeOfDay: "",
    }
  }

  handleSendPing = (e) => {
    e.preventDefault()
    const { startTime, hour, min, timeOfDay, duration } = this.state;
    const { selectedOrg } = this.props;
    
    axios
      .post("/users/sendPing", {
        orgId: selectedOrg.id,
        startTime: hour + ":" + min + " " + timeOfDay,
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
    const hours = [1,2,3,4,5,6,7,8,9,10,11,12]
    const mins = ["00",15,30,45]
    const durationArr = ["0-1 hour", "1-2 hours", "3-4 hours", "4+ hours", "As long as needed"]
    
    const { selectedOrg } = this.props;
    const { hour, min, timeOfDay, duration } = this.state
    
    console.log("SendPing state: ", this.state)
    let currentTime = new Date()
    let currentHour = currentTime.getHours()

    const checkForm = hour && min && timeOfDay && duration ? false : true;

    return (
      <div className="send-ping-parent-container">
        <h3>You've selected: {selectedOrg.name}</h3>

        <form onSubmit={this.handleSendPing} className="send-ping-form">
          <p>What time are you available to start?</p>
          {/* Select start time: hour */}
          <select name="hour" onChange={this.handleInputChange} className="select">
            {["", ...hours].map(hr => {
              return <option value={hr} key={hr}>{hr}</option>
            })}
          </select>:
          {/* Select start time: minute */}
          <select name="min" onChange={this.handleInputChange} className="select">
            {["", ...mins].map(hr => {
              return <option value={hr} key={hr}>{hr}</option>
            })}
          </select>
          {/* Select start time: AM/PM */}
          <select name="timeOfDay" onChange={this.handleInputChange} className="select">
            {["", "AM", "PM"].map(elem => {
              return <option value={elem} key={elem}>{elem}</option>
            })}
          </select>
      
          <p>For how long are you available?</p>
          {/* Select duration of volunteer availibility */}
          <select name="duration" onChange={this.handleInputChange}>
            {["", ...durationArr].map(timeOption => {
              return <option value={timeOption} key={timeOption}>{timeOption}</option>
            })}
          </select>
          
          <input type="submit" value="Send" className="send-ping-submit" disabled={checkForm} />
        </form>

        {this.state.message}
        
      </div>
    )
  }
}