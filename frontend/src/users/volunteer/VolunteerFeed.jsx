import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Modal from "react-modal";
import axios from "axios";
import googleKey from "../../google-key.js"
import "../../CSS/volFeed.css";

import MapContainer from "./MapContainer";
import SendPing from "./SendPing";

Modal.setAppElement('#root')

// Modal styling
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class VolunteerFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allOrgs: [],
			selectedOrg: "",
			message: "",
			modalIsOpen: false
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

	// ---------- Modal functions ---------- //
	openModal = () => {
    this.setState({ modalIsOpen: true });
  }
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
		// this.subtitle.style.color = '#f00';
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false });
	}
	// -------- End Modal functions -------- //

	
	renderOrgsList = () => {
		const { allOrgs, selectedOrg } = this.state;

		return (
			<div className="vol-feed-orgs-div">
				{allOrgs.map(org => {
					return (
						<div className="single-org" onClick={this.handleOrgClick} id={org.username} key={org.name}>
							{org.name}<br />
							{org.telephone}<br/>
							{org.website}<br/>
							{org.address}<br />
							
							{
								selectedOrg.id === org.id
								? <button onClick={this.openModal} className="send-ping-submit">
										Send Ping
									</button>
								: ""
							}
							
						</div>
					)
				})}
			</div>
		)
	}


	render() {
		const { user } = this.props;
		const { allOrgs, selectedOrg, message } = this.state;

		// console.log("state in volfeed: ", this.state)
		
		return (
			<div className="vol-feed-parent-container">
				<div className="map-container">
					<MapContainer 
						google={this.props.google} 
						allOrgs={allOrgs} 
						selectedOrg={selectedOrg}/>
				</div>

				{ this.renderOrgsList() }

				{message}

				<div>
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={customStyles}
						contentLabel="Send Ping Modal"
					>
						<SendPing selectedOrg={selectedOrg} />
						<button onClick={this.closeModal}>&#10005;</button>
					</Modal>
      	</div>
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: googleKey.key
})(VolunteerFeed)
