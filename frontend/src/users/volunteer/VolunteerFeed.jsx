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
			selectedOrg: "",
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

	handleOrgClick = (e) => {
		const { allOrgs } = this.state;

		for (let i = 0; i < allOrgs.length; i++) {
			if (allOrgs[i].username === e.target.id) {
				this.setState({
					selectedOrg: allOrgs[i]
				})
				return;
			}
		} 
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
						<div className="single-org" onClick={this.handleOrgClick} id={org.username} key={org.name}>
							<span className="org-name">{org.name}</span><br />
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
		const { allOrgs, selectedOrg, message } = this.state;
		
		return (
			<div className="vol-feed-parent-container">
				{this.renderOrgsList()}
				<div className="vol-feed-map-and-ping-container">
					<MapContainer google={this.props.google} allOrgs={allOrgs} selectedOrg={selectedOrg} />
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
