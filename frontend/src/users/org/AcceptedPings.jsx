import React from "react";


// Child of OrgFeed component
const AcceptedPings = ({ accepted, handleDeclinePing }) => {
  return accepted.map(ping => {
      return (
        <div name={ping.ping_id} className="each-ping" key={Math.random()}>
          {ping.name} {" "} (@{ping.username})<br />
          Sent at: {ping.time_sent.slice(0, 21)}<br />
          Start time: {ping.start_time}<br />
          Available for: {ping.duration}<br />
          <button className="accept-decline-ping" 
                  onClick={handleDeclinePing} 
                  id={ping.ping_id} 
                  name="decline">
            &#10005;
          </button>
        </div>
      )
  })
}

export default AcceptedPings;