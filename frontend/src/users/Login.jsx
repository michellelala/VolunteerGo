import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor() {
		super()

		this.state = {
			usernameInput: "",
			passwordInput: "",
			message: ""
		}
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleLoginFormSubmit = e => {
		const { usernameInput, passwordInput, message } = this.state;
		axios
			.post("/users/login", {
				username: usernameInput,
				password: passwordInput
			})
	}

  render() {
		const { usernameInput, passwordInput, message } = this.state;
		console.log(this.state)
    return (
      <div>
				<form>
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
						onChange={this.handleInputChange}
					/>
					<input
						type="submit"
						value="Login"
					/>
				</form>
			</div>
    );
  }
}
