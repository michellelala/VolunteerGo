import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

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

	handleInputChange = e => {
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
				// console.log("data from /users/login axios call: ", res.data)
				this.props.setUser(res.data)
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
      return <Redirect to="/register" />;
    }
		
    return (
      <div>
				<form onSubmit={this.handleLoginFormSubmit}>
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
						type="submit"
						value="Login"
					/>
				</form>
				{message}
			</div>
    );
  }
}
