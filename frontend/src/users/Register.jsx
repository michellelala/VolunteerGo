import React, { Component } from "react";
import axios from "axios";

import "../CSS/register.css";

export default class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emailInput: "",
			usernameInput: "",
			passwordInput: "",
			nameInput: "",
			isUserCreated: false,
			telephoneInput: "",
			addressInput: "",
			websiteInput: "",
			isOrganization: null,
			message: ""
		}
	}

	handleInputChange = (e) => {
			this.setState({
				[e.target.name]: e.target.value
			})
	}

	handleUserType = (e) => {
		if (e.target.innerText === "Volunteer") {
			this.setState({ isOrganization: false })
		} else if (e.target.innerText === "Non-Profit Organization") {
			this.setState({ isOrganization: true })
		}
	}

	handleRegisterVolunteer = (e) => {
		e.preventDefault();
		const { emailInput, usernameInput, passwordInput, nameInput, 
						isOrganization } = this.state;
		
		axios
			.post("/users/register", {
				username: usernameInput,
				password: passwordInput,
				email: emailInput,
				name: nameInput,
				org: isOrganization
			})
			.then(() => {
				this.setState({
				isUserCreated: true,
				message: `Successfully registered new volunteer!`
				})
			})
			.catch(err => {
				this.setState({
					message: "Error registering new volunteer."
				})
			})
	}
	
	dependingOnUserType = () => {
		const { isOrganization, telephoneInput, addressInput, websiteInput } = this.state;

		if (isOrganization === false) {
			return (
			<button onClick={this.handleRegisterVolunteer}>
				Register me as a volunteer 
				</button>
			)
		} else if (isOrganization === true) {
			return (
				<div className="reg-org">
					<input
						value={telephoneInput}
						placeholder="Phone #"
						name="telephoneInput"
						onChange={this.handleInputChange}
					/>
					<input
						value={addressInput}
						placeholder="Address"
						name="addressInput"
						onChange={this.handleInputChange}
					/>
					<input
						value={websiteInput}
						placeholder="Website"
						name="websiteInput"
						onChange={this.handleInputChange}
					/>
				</div>
			)
		}
	}

  render() {
		const { emailInput, usernameInput, passwordInput, nameInput } = this.state;

		console.log("Register state: ", this.state)
		return (
			<div className="register-parent-div">
				<h3>Hi, you're in the Register component</h3>
				<div className="register-div">
					<input
						value={emailInput}
						placeholder="Email"
						name="emailInput"
						onChange={this.handleInputChange}
					/>
					<input
						value={usernameInput}
						placeholder="Username"
						name="usernameInput"
						onChange={this.handleInputChange}
					/>
					<input
						value={passwordInput}
						placeholder="Password"
						name="passwordInput"
						type="password"
						onChange={this.handleInputChange}
					/>
					<input
						value={nameInput}
						placeholder="Volunteer/Organization Name"
						name="nameInput"
						onChange={this.handleInputChange}
					/>
				</div>

				<h3>I'm a...</h3>
				<div className="choose-user-type-div">
					<div className="user-type" onClick={this.handleUserType}>
						Volunteer
					</div>
					<div className="user-type" onClick={this.handleUserType} name="organization">
						Non-Profit Organization
					</div>
				</div>

				<div className="reg-depending-on-user-type">
					{this.dependingOnUserType()}
				</div>

				{this.state.message}
			</div>
  	);
	}
}
