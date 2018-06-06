## VolunteerGo
*Here to lend a helping hand.*

Good samaritans of the world: have you ever wanted to volunteer somewhere, but weren't sure of when you'd have the time?

Non-profit orgs: have you ever wished that you could have a one-stop-shop for volunteers? Somewhere you could see when a volunteer is available, how long they're available, and have them let you know of all that information in advance?

Look no further! VolunteerGo is here to solve your volunteering woes.

---

VolunteerGo was built with love and care, using Express, Node.js, and PostgreSQL on the back-end, and React.js and HTML/CSS on the front-end. The following APIs / packages were used:
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial): Geocoding, Markers, InfoWindows
* google-maps-react
* react-modal
* react-tabs

Other features:

Organizations can:
- Sign up to be part of the network of non-profit organizations
- Start receiving pings (volunteers send this to alert you of their availability) right away
- Accept or decline pings based on your organizational needs
- See their ping request history

Volunteers can:
- Sign up to be part of the network of volunteers
- Send pings to organizations
- See what organizations are near their current location
- See their ping history

---

Future Features: 
- Volunteers will receive notifications when their ping is accepted/declined/expired
- Organizations will receive notifications for when they receive a new ping
- Email confirmation to reduce fake account creation
- User profiles for both user groups
- AWS to host user images (for profile pictures)