import React, { Component } from "react";
import dotenv from "dotenv";
import { GoogleApiWrapper } from "google-maps-react";
import Map from "./Map";

dotenv.load();

// The parent of Map
export class MapContainer extends Component {
	render() {
		const { allOrgs, selectedOrg } = this.props;

		if (!this.props.loaded) {
			return <div>Loading map...</div>
		}

		return (
			<div>
				<Map google={this.props.google} allOrgs={allOrgs} selectedOrg={selectedOrg} />
			</div>
		)
	}
}


export default GoogleApiWrapper({
	apiKey: process.env.GOOGLE_KEY
})(MapContainer)
