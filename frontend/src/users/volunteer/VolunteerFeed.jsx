import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";

import googleKey from "../../google-key.js"
// import Geolocation from "react-geolocation";

import MapContainer from "./MapContainer";
import SendPing from "./SendPing";

class VolunteerFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allOrgs: []
		}
	}

	componentDidMount() {
		axios
			.get("/users/getAllOrgs")
			.then((res) => {
				console.log("data: ", res.data)
				this.setState({
					allOrgs: res.data
				})
			})
	}

	componentDidUpdate() {
	}


	render() {
		const { user } = this.props
		
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
