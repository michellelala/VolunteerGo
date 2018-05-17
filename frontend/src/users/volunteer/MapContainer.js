import React, { Component } from "react";
// import ReactDOM from "react-dom";
import googleKey from "../../google-key.js"
import { GoogleApiWrapper } from "google-maps-react";
import Map from "./Map";
// import Marker from "./Marker";

// The parent of Map
export class MapContainer extends Component {
	render() {
		const style = {
			width: "70vw",
			height: "70vh"
		}

		if (!this.props.loaded) {
			return <div>Loading map...</div>
		}

		return (
			<div>
				<Map google={this.props.google}/>
			</div>
		)
	}
}


export default GoogleApiWrapper({
	apiKey: googleKey.key
})(MapContainer)
