import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import googleKey from "../../google-key.js"
import "../../CSS/volFeed.css";
// import Geolocation from "react-geolocation";

import MapContainer from "./MapContainer";
import SendPing from "./SendPing";

class VolunteerFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allOrgs: [],
			message: ""
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
			.catch(err => {
				this.setState({
					message: "There was an error. Sorry for the inconvenience!"
				})
			})
	}

	componentDidUpdate() {
	}

	renderSendPing = () => {
		return <SendPing />
	}


	render() {
		const { user } = this.props;
		const { allOrgs, message } = this.state;
		
		return (
			<div className="vol-feed-container">
				{/* {this.renderSendPing} */}
				<SendPing />
				<MapContainer google={this.props.google} allOrgs={allOrgs} />
				{message}
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: googleKey.key
})(VolunteerFeed)
