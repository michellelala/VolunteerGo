import React from "react";


// Child of OrgFeed component
const DeclinedPings = ({ declined, handleDeclinePing }) => {
  return declined.map(ping => {
    let timeSent = ping.time_sent // time stamp-default military time
    // Get the day of the week, month, and date
    let date = timeSent.slice(0,3) + ", " + timeSent.slice(4,7) + " " + timeSent.slice(8,10)
    let hour = timeSent.slice(16, 18) // Get the hour
    let min = timeSent.slice(19, 21) // Get the minute
    let timeOfDay = "AM" // Set default time of day to AM
    
    // Alter time to follow 12-hour clock
    if (parseInt(hour) > 12) { 
      timeOfDay = "PM"
      hour -= 12 
    }
    timeSent = hour + ":" + min + timeOfDay

    return (
      <div name={ping.ping_id} className="each-ping" key={Math.random()+1}>
        <span className="bold">{ping.name}</span> {" "} (@{ping.username})<br />
        <span className="smaller">
          <span className="underline">Sent at</span>: {date} @{timeSent}<br />
          <span className="underline">Start time</span>: {ping.start_time}<br />
          <span className="underline">Available for</span>: {ping.duration}<br />
        </span>
        {/* <button className="accept-decline-ping" onClick={this.handleDeclinePing} id={ping.ping_id} name="decline">
          &#10005;
        </button>
        <button className="accept-decline-ping" onClick={this.handleAcceptPing} id={ping.ping_id} name="accept">
          &#10004;
        </button> */}
      </div>
    )
  })
}

export default DeclinedPings;