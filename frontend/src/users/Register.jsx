import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
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

	// Set user type (this.state.isOrganization) to 
	// volunteer or organization depending on which is clicked
	handleUserType = (e) => {
		if (e.target.innerText === "Volunteer") {
			this.setState({
				isOrganization: false, 
				message: "" })
		} else if (e.target.innerText === "Non-Profit Org") {
			this.setState({ 
				isOrganization: true, 
				message: "" })
		}
	}

	handleRegisterSubmit = (e) => {
		e.preventDefault();
		const { emailInput, usernameInput, passwordInput, nameInput, 
						isOrganization, telephoneInput, addressInput, websiteInput } = this.state;
		
		// ---- CHECKS FOR BOTH VOLUNTEER AND ORGANIZATION
		// Check for empty fields
		if (!emailInput || !usernameInput || !passwordInput || !nameInput) {
			return this.setState({
				message: "Please make sure all fields are filled out."
			})
			// Check for username/password length
		} else if (usernameInput.length < 5 || passwordInput.length < 5) {
			return this.setState({
				message: "Username / Password must be at least 5 characters in length."
			})
			// Check for valid email
		} else if (!this.isValidEmail(emailInput)) {
			return this.setState({
				message: "Invalid email."
			})
		}

		// Register volunteers
		if (!isOrganization) {
			axios
				.post("/users/register/volunteer", {
					username: usernameInput,
					password: passwordInput,
					email: emailInput,
					name: nameInput
				})
				.then(() => {
					this.setState({
						isUserCreated: true,
						message: `Successfully registered new volunteer!`
					})
				})
				.then(() => {
					return <Redirect to="/home" />
				})
				.catch(err => {
					this.setState({ 
						message: "Sorry, that email or username is in use already."
					})
				})
		} else {
				axios
					.post("/users/register/organization", {
						username: usernameInput,
						password: passwordInput,
						email: emailInput,
						name: nameInput,
						telephone: telephoneInput,
						address: addressInput,
						website: websiteInput
					})
					.then(() => {
						this.setState({
							isUserCreated: true,
							message: `Successfully registered new organization!`
						})
					})
					.then(() => {
						return <Redirect to="/home" />
					})
					.catch(err => {
						this.setState({ 
							message: "Sorry, that email or username is in use already."
						})
					})
			}
	}

	handleClearFields = (e) => {
		this.setState({
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
		})
	}

	// --------------- HELPER FUNCTIONS ---------------
	isValidEmail = (email) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
	};

	dependingOnUserType = () => {
		const { isOrganization, telephoneInput, addressInput, websiteInput } = this.state;

		if (isOrganization === false) { // Volunteer submit
			return (
				<div className="reg-submit-div">
					<button onClick={this.handleClearFields} className="reg-clear">
						Clear fields
					</button>
					<button onClick={this.handleRegisterSubmit} className="reg-submit">
						Register
					</button>
				</div>
			)
		} else if (isOrganization === true) { // Org submit
			return (
				<div className="reg-org">
					<input
						value={telephoneInput}
						placeholder="Phone #"
						name="telephoneInput"
						onChange={this.handleInputChange}
						className="reg-input-divs"
					/>
					<input
						value={addressInput}
						placeholder="Address"
						name="addressInput"
						onChange={this.handleInputChange}
						className="reg-input-divs"
					/>
					<input
						value={websiteInput}
						placeholder="Website"
						name="websiteInput"
						onChange={this.handleInputChange}
						className="reg-input-divs"
					/>
					<br />
					<div>
						<button onClick={this.handleClearFields} className="reg-clear">Clear fields</button>
						<button onClick={this.handleRegisterSubmit} className="reg-submit">Register</button>
					</div>
				</div>
			)
		}
	}

  render() {
		const { emailInput, usernameInput, passwordInput, nameInput, isUserCreated } = this.state;

		if (isUserCreated) {
      return <Redirect to="/home" />;
		}
		
		return (
			<div className="reg-parent-container">
				<div className="reg-div">
					<input
						value={emailInput}
						placeholder="Email"
						name="emailInput"
						onChange={this.handleInputChange}
						className="reg-input-divs"
					/>
					<input
						value={usernameInput}
						placeholder="Username"
						name="usernameInput"
						onChange={this.handleInputChange}
						className="reg-input-divs"
					/>
					<input
						value={passwordInput}
						placeholder="Password"
						name="passwordInput"
						type="password"
						onChange={this.handleInputChange}
						className="reg-input-divs"
					/>
					<input
						value={nameInput}
						placeholder="Volunteer/Organization Name"
						name="nameInput"
						onChange={this.handleInputChange}
						className="reg-input-divs"
					/>
				</div>

				<h3 className="reg-header">I'm a...</h3>
				<div className="choose-user-type-div">
					<div className="user-type" onClick={this.handleUserType}>
						Volunteer 
					</div>
					<div className="user-type" onClick={this.handleUserType} name="organization"> 
						Non-Profit Org 
					</div>
				</div>

				<div className="reg-depending-on-user-type">
					{this.dependingOnUserType()}
				</div>

				<div className="error-message">{this.state.message}</div>

				<div className="reg-or-login-div">
					<h3>Already have an account? {" "}
						<Link to="/login">Login here</Link>.
					</h3>
				</div>
			</div>
  	);
	}
}
