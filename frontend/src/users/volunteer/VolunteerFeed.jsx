import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from "./MapContainer";
import googleKey from "../../google-key.js"

class VolunteerFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			testing: false
		}
	}

	render() {
		return (
			<div>
				<h2>Beginning of map</h2>
					<MapContainer google={this.props.google} />
				<h2>End of map</h2>
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: googleKey.key
})(VolunteerFeed)
