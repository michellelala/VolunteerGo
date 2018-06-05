import React from "react";

const Pending = ({ pending }) => {
  
  return pending.map(ping => {
      let timeSent = ping.time_sent // Default military time
      let date = timeSent.slice(0,3) + ", " + timeSent.slice(4,7) + " " + timeSent.slice(8,10)
      let hour = timeSent.slice(16, 18) // Get the hour
      let min = timeSent.slice(19, 21) // Get the minute
      let timeOfDay = " AM" // Set default time of day to AM
      // Alter time to follow 12-hour clock
      if (parseInt(hour) > 12) { 
        timeOfDay = " PM"
        hour -= 12 
      }
      timeSent = hour + ":" + min + timeOfDay
      
      return (
        <div key={ping.time_sent} className="each-ping">
          <span className="ping-header">{date} @{timeSent}</span><br />
          <span className="smaller">
            <span className="bold">{ping.name}</span><br />
            <span className="underline">Start</span>: {ping.start_time}<br />
            <span className="underline">Duration</span>: {ping.duration}<br />
          </span>
        </div>
      )
    })
  
}

export default Pending;