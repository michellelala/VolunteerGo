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
	renderOrgsList = () => {
		const { allOrgs } = this.state;

		return (
			<div className="vol-feed-orgs-div">
				{allOrgs.map(org => {
					return (
						<div className="single-org">
							<h4>{org.name}</h4>
							Tel: {org.telephone}<br/>
							Address: {org.address}<br/>
							Web: {org.website}
						</div>
					)
				})}
			</div>
		)
	}


	render() {
		const { user } = this.props;
		const { allOrgs, message } = this.state;
		console.log("all orgs: ", allOrgs)
		
		return (
			<div className="vol-feed-parent-container">
					{this.renderOrgsList()}
				<div className="vol-feed-map-and-ping-container">
					<MapContainer google={this.props.google} allOrgs={allOrgs} />
					<SendPing />
				</div>
					{message}
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: googleKey.key
})(VolunteerFeed)
