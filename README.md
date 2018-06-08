# VolunteerGo
*Here to lend a helping hand.*

Hello, and welcome to VolunteerGo.

![landing page for app](https://imgur.com/jTPAnHz.png "VolunteerGo Landing Page")

--- 

### Background

I thought of this app as a solution to a problem I had back in college. As part of the Honors program, I needed to meet a minimum number of service hour requirements. Between going to school as a full-time student and working almost full-time hours in retail, it was difficult to squeeze in these hours.

It would have been great if I had an app, like VolunteerGo, where I could find non-profit organizations around me and send them a quick message to see if they needed me that day. I would have loved to volunteer in the 2-hour scheduled breaks during certain school days, but there weren't any technologies available back then that did something like this.

Thus, the idea for this app was born.

(FYI, I left the Honors program.)

---

### How VolunteerGo Was Built

With love and care, naturally! But I also used Express, Node.js, and PostgreSQL on the back-end, and React.js and HTML/CSS on the front-end. The following APIs / packages were used:

* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
  * [Geocoding](https://developers.google.com/maps/documentation/javascript/geocoding)
  * [Markers](https://developers.google.com/maps/documentation/javascript/markers)
  * [Info Windows](https://developers.google.com/maps/documentation/javascript/infowindows)
* [google-maps-react](https://www.npmjs.com/package/google-maps-react)
* [react-modal](https://www.npmjs.com/package/react-modal)
* [react-tabs](https://www.npmjs.com/package/react-tabs)

#### Features

* Sign up for an account, either as a volunteer or a non-profit organization
<img src="./frontend/public/preview/landing.gif" alt="gif of landing and login page" />

* Users are authenticated using passport.js, and passwords are salted, hashed, and stored securely in the database
* As an organization:
  - Start receiving pings (volunteers send this to alert you of their availability) right away
  - Accept or decline pings based on your organizational needs
  - See your ping history (separated by accepted, declined, and pending)
* As a volunteer:
  - View your current location
  - See location and information of nearby non-profits
  - Send pings to these non-profits
  - See your ping history (separated by accepted, declined, and pending)

---

### Next Steps: The Future of VolunteerGo

- Implement notifications for both user groups on ping status changes
- More dynamic map experience for volunteers
- Implement confirmations for sending/declining requests
- Email confirmation to reduce fake account creation
- User profiles for both user groups
- AWS to host user images (for profile pictures)
