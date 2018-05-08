const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/volunteergo");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");


// ----- REGISTER new user ----- "/users/register" ----- //
const registerUser = (req, res, next) => {
	const hash = authHelpers.createHash(req.body.password);
  db
    .none(
      "INSERT INTO users (username, password_digest, email, name, org) VALUES (${username}, ${password}, ${email}, ${name}, ${org})",
      {
        username: req.body.username,
        password: hash,
				email: req.body.email,
				name: req.body.name,
				org: req.body.org
      }
    )
	.then(() => {
		return next();
	})
	.catch(err => {
		res.status(500).json({
			message: "error registering new user",
			error: err,
			body: req.body
		})
	});
};

// ----- LOGOUT user ----- "/users/logout" ----- //
const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).json("Successfully logged out.");
}


// ----- GET ALL ORGANIZATIONS ----- "/users/getAllOrgs" ----- //
const getAllOrgs = (req, res, next) => {
	db
		.any(
		"SELECT users.id, users.username, users.name, users.email, organizations.telephone, organizations.address, organizations.website FROM organizations JOIN users ON organizations.org_id=users.id;"
	)
	.then(data => {
		res.status(200).send(data)
	})
	.catch(err => {
		res.status(500).json({
			message: "Unable to retrieve all organizations.",
			error: err
		})
	})
}

// ----- GET ALL VOLUNTEERS ----- "/users/getAllVolunteers" ----- //
const getAllVolunteers = (req, res, next) => {
	db
		.any(
			"SELECT username, name FROM users WHERE org=false;"
		)
		.then(data => {
			res.status(200).send(data)
		})
		.catch(err => {
			res.status(500).json({
				message: "Unable to retrieve all volunteers.",
				error: err
			})
		})
}


module.exports = {
	registerUser,
	logoutUser,
	getAllOrgs,
	getAllVolunteers
};
