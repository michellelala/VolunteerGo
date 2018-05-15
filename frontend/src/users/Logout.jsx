import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import axios from "axios";

export default class Logout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedOut: false,
			message: ""
		}
	}

	componentDidMount() {
		if (this.props.user) {
			this.props.logoutUser();
			this.setState({
				loggedOut: true
			})
		} else {
			this.setState({
				message: "You must first login."
			})
		}
	}

	render() {
		return (
			<div>
				{<Redirect to="/login" />}
				{this.state.message}
			</div>
		)
	}
}