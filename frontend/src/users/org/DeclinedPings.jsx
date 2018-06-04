import React from "react";


// Child of OrgFeed component
const DeclinedPings = ({ declined, handleDeclinePing }) => {
  return declined.map(ping => {
    return (
      <div name={ping.ping_id} className="each-ping" key={Math.random()+1}>
        {ping.name} {" "} (@{ping.username})<br />
        Sent at: {ping.time_sent.slice(0, 21)}<br />
        Start time: {ping.start_time}<br />
        Available for: {ping.duration}<br />
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