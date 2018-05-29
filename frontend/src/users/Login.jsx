import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import "../CSS/login.css";


export default class Login extends Component {
  constructor() {
		super()

		this.state = {
			usernameInput: "",
			passwordInput: "",
			message: "",
			loggedIn: false
		}
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleLoginFormSubmit = e => {
		e.preventDefault();
		const { usernameInput, passwordInput } = this.state;

		axios
			.post("/users/login", {
				username: usernameInput,
				password: passwordInput
			})
			.then(res => {
				this.props.setUser()
				this.setState({
					usernameInput: "",
					passwordInput: "",
					loggedIn: true
				})
			})
			.catch(err => {
				this.setState({
					usernameInput: "",
					passwordInput: "",
					message: "Username/password combo failed."
				})
			})
	}

  render() {
		const { usernameInput, passwordInput, message, loggedIn } = this.state;
		// console.log("Login props: ", this.props)


		if (loggedIn) {
      return <Redirect to="/home" />;
    }
		
    return (
      <div className="login-container">
				<form onSubmit={this.handleLoginFormSubmit}>
					<input
						value={usernameInput}
						placeholder="Username"
						name="usernameInput"
						onChange={this.handleInputChange}
						className="login-username"
					/>
					<br />
					<input
						value={passwordInput}
						placeholder="Password"
						name="passwordInput"
						type="password"
						onChange={this.handleInputChange}
						className="login-password"
					/>
					<br />
					<input
						type="submit"
						value="Login"
						className="login-submit"
					/>
				</form>
				<div className="error-message">{this.state.message}</div>

				<div className="reg-or-login-div">
					<h3>Don't have an account? {" "}
						<Link to="/register">Register here</Link>.
					</h3>
				</div>
			</div>
    );
  }
}
