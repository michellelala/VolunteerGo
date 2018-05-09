const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/volunteergo");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

/*
*/
// ----- REGISTER NEW USER ----- "/users/register"
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

// ----- LOG OUT USER ----- "/users/logout"
const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).json("Successfully logged out.");
}


// ----- GET ALL ORGANIZATIONS ----- "/users/getAllOrgs"
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

// ----- GET ORG ID BY USERNAME ----- "/users/getOrgId/:orgUsername"
const getOrgIdByUsername = (req, res, next) => {
	db
		.one(
			"SELECT id FROM users WHERE username=${orgUsername}", { orgUsername: req.params.orgUsername }
		)
		.then(data => res.status(200).send(data))
		.catch(err => res.status(500).send("Error retrieving org id. Check username."))
}

// ----- GET ALL VOLUNTEERS ----- "/users/getAllVolunteers"
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

// ----- GET ALL PINGS FOR LOGGED IN VOLUNTEER ----- "/users/getPingsSentByVolunteer"
const getPingsSentByVolunteer = (req, res, next) => {
	db
		.any(
			"SELECT org_id, users.username, start_time, duration, accepted FROM pings JOIN users ON pings.org_id=users.id WHERE volunteer_id=${id}",
			{
				id: req.user.id
			}
		)
		.then(data => {
			res.status(200).send(data)
		})
		.catch(err => {
			res.status(500).json({
				error: err,
				message: "There was an error retrieving your pings."
			})
		})
}

// ----- GET ALL PINGS SENT TO LOGGED IN ORG ----- "/users/getPingsSentToOrg"
const getPingsSentToOrg = (req, res, next) => {
	db
		.any(
			"SELECT users.username, users.email, users.name, start_time, duration, accepted FROM pings JOIN users ON pings.volunteer_id=users.id WHERE org_id=${id};",
			{
				id: req.user.id
			}
		)
		.then(data => res.status(200).send(data))
		.catch(err => {
			res.status(500).json({
				error: err,
				message: "Error retrieving pings sent to you."
			})
		})
}

// ----- ADD A PING ----- "/users/sendPing"
const sendPing = (req, res, next) => {
	db
		.none(
			"INSERT INTO pings VALUES (DEFAULT, ${volunteerId}, ${orgId}, ${startTime}, ${duration})",
			{
				volunteerId: req.user.id, // only volunteers can ping
				orgId: req.body.orgId,
				startTime: req.body.startTime,
				duration: req.body.duration
			}
		)
		.then(() => {
			res.status(200).send(`Successfully pinged ${req.body.orgId}!`)
		})
		.catch(err => {
			res.status(500).send("Unable to send ping!")
		})
}

module.exports = {
	registerUser,
	logoutUser,
	getAllOrgs,
	getOrgIdByUsername,
	getAllVolunteers,
	getPingsSentByVolunteer,
	getPingsSentToOrg,
	sendPing
};
