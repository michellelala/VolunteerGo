import React from "react";


// Child of OrgFeed component
const PendingPings = ({ pending, handleAcceptPing, handleDeclinePing}) => {
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
      <div name={ping.ping_id} className="each-ping" key={Math.random()}>
        <span className="bold">{ping.name}</span> {" "} (@{ping.username})<br />
        <span className="smaller"> 
          <span className="underline">Sent at</span>: {date} @{timeSent}<br />
          <span className="underline">Start time</span>: {ping.start_time}<br />
          <span className="underline">Available for</span>: {ping.duration}<br />
        </span>
        <button className="accept-decline-ping" 
                onClick={handleDeclinePing} 
                id={ping.ping_id} 
                name="decline">
          &#10005;
        </button>
        <button 
          className="accept-decline-ping" 
          onClick={handleAcceptPing} 
          id={ping.ping_id} 
          name="accept">
          &#10004;
        </button>
      </div>
    )
})
}

export default PendingPings;