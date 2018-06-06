import React from "react";
import { Link } from "react-router-dom";

import "./CSS/landing.css";

const LandingPage = () => {

  return (
    <div className="landing-parent-div">
      <div className="hold-images">
        {/* <img src="https://imgur.com/gJAfR4S.jpg" className="hands" alt="hands holding up letters that spell out the word volunteer" /> */}
      </div>

      <div className="clear-space"></div>
      <div className="clear-space"></div>
      
      <div className="landing-user-type vol-title">
        VOLUNTEER
      </div>
      <div className="space"></div>
      <div className="hold-blurbs">
        <p className="blurb">
          It should be easy to volunteer when you want to.
        </p>
        <p className="blurb">
          It should be, but it isn't. <Link to="/register" className="link">Sign-up</Link> for an account to get access to non-profit organizations that are looking for stellar volunteers, like you!
        </p>
        <p className="blurb">
          Find an organization you like? Great! Send them a ping to let them know when you're available.
        </p>
      </div>
      <div className="space"></div>

      <div className="clear-space"></div>

      <div className="landing-user-type org-title">
        NON-PROFIT ORG
      </div>
      <div className="space"></div>
      <div className="hold-blurbs">
        <p className="blurb">
          Finding volunteers isn't always the easiest task.
        </p>
        <p className="blurb">
          So how can we help? <Link to="/register" className="link">Sign-up</Link> for an account to get access to volunteers that are looking to make a difference.
        </p>
        <p className="blurb">
          You'll receive pings from these good samaritans. Accept or decline based on your needs!
        </p>
      </div>
      <div className="space"></div>

      <div className="clear-space"></div>
      <div className="clear-space"></div>
    </div>
  )

}

export default LandingPage;