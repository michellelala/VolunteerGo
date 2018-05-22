import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import googleKey from "../../google-key.js"
// import Geolocation from "react-geolocation";

import MapContainer from "./MapContainer";
import SendPing from "./SendPing";

class VolunteerFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {
		// this.getCurrentPosition()
	}

	componentDidUpdate() {
	}


	render() {
		return (
			<div>
				<h2>Beginning of map</h2>
					<MapContainer google={this.props.google} />
				<h2>End of map</h2>

				<SendPing />
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: googleKey.key
})(VolunteerFeed)
