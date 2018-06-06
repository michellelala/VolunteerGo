const pgp = require("pg-promise")({});
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");
import dotenv from "dotenv";
dotenv.load();
const db = pgp(process.env.DATABASE_URL);



// ----- REGISTER NEW USER
// ----- "/users/register/volunteer"
const registerVolunteer = (req, res, next) => {
	const hash = authHelpers.createHash(req.body.password);
  db
    .none(
      "INSERT INTO users (username, password_digest, email, name, org) VALUES (${username}, ${password}, ${email}, ${name}, false)",
      {
        username: req.body.username,
        password: hash,
				email: req.body.email,
				name: req.body.name
      }
    )
	.then(() => {
		return next();
	})
	.catch(err => {
		res.status(500).json({
			message: "Error registering new volunteer.",
			error: err,
			body: req.body
		})
	});
};

// ----- ADD NEW ORG INFO
// ----- "/users/register/organization"
const registerOrganization = (req, res, next) => {
	const hash = authHelpers.createHash(req.body.password);
	db
		.none(
      "INSERT INTO users VALUES (DEFAULT, ${username}, ${password}, ${email}, ${name}, true, ${telephone}, ${address}, ${website}, DEFAULT)", {
				username: req.body.username,
        password: hash,
				email: req.body.email,
				name: req.body.name,
				telephone: req.body.telephone,
				address: req.body.address,
				website: req.body.website
			}
		)
		.then(() => {
			return next();
		})
		.catch(err => {
			res.status(500).json({
				message: "Error registering new organization.",
				error: err,
				body: req.body
			})
		});
}

// ----- LOG OUT USER
// ----- "/users/logout"
const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).json("Successfully logged out.");
}

// ----- GET USER
// ----- "/users/getUser"
const getUser = (req, res, next) => {
  db
    .one("SELECT username, name, email, org FROM users WHERE username=${username}", {
      username: req.user.username
    })
    .then(data => {
      res.status(200).json({ 
				user: data
			});
		})
		.catch(err => {
			res.status(500).send("Error retrieving user.")
		})
}

// ----- GET ALL USER EMAILS
// ----- "/users/getAllEmails"
const getAllEmails = (req, res, next) => {
	db
		.any("SELECT email FROM users")
		.then(data => {
			res.status(200).send(data.map(user => user.email))
		})
		.catch(err => {
			res.status(500).send("Error retrieving all emails.")
		})
}

// ----- GET ALL USER USERNAMES
// ----- "/users/getAllUsernames"
const getAllUsernames = (req, res, next) => {
	db
		.any("SELECT username FROM users")
		.then(data => {
			res.status(200).send(data.map(user => user.username))
		})
		.catch(err => {
			res.status(500).send("Error retrieving all usernames.")
		})
}

// ----- GET ALL ORGANIZATIONS
// ----- "/users/getAllOrgs"
const getAllOrgs = (req, res, next) => {
	db
		.any(
			"SELECT id, username, name, telephone, address, website FROM users WHERE org=true;"
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

// ----- GET ORG ID BY USERNAME
// ----- "/users/getOrgId/:orgUsername"
const getOrgIdByUsername = (req, res, next) => {
	db
		.one(
			"SELECT id FROM users WHERE username=${orgUsername}", { orgUsername: req.params.orgUsername }
		)
		.then(data => res.status(200).send(data))
		.catch(err => res.status(500).send("Error retrieving org id. Check username."))
}

// ----- GET ALL VOLUNTEERS
// ----- "/users/getAllVolunteers"
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

// ----- GET ALL PINGS FOR LOGGED IN VOLUNTEER
// ----- "/users/getPingsSentByVolunteer"
const getPingsSentByVolunteer = (req, res, next) => {
	db
		.any(
			"SELECT org_id, users.name, time_sent, start_time, duration, accepted FROM pings JOIN users ON pings.org_id=users.id WHERE volunteer_username=${username}",
			{
				username: req.user.username
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

// ----- GET ALL PINGS SENT TO LOGGED IN ORG
// ----- "/users/getPingsSentToOrg"
const getPingsSentToOrg = (req, res, next) => {
	db
		.any(
			"SELECT pings.id as ping_id, users.username, users.email, users.name, time_sent, start_time, duration, accepted FROM pings JOIN users ON pings.volunteer_username=users.username WHERE org_id=${id};",
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

// ----- SEND A PING
// ----- "/users/sendPing"
const sendPing = (req, res, next) => {
	db
		.none(
			"INSERT INTO pings (volunteer_username, org_id, time_sent, start_time, duration, accepted) VALUES (${volunteerUsername}, ${orgId}, ${timeSent}, ${startTime}, ${duration}, NULL)",
			{
				volunteerUsername: req.user.username, // only volunteers can ping
				orgId: req.body.orgId,
				timeSent: new Date().toString(),
				startTime: req.body.startTime,
				duration: req.body.duration
			}
		)
		.then(() => {
			res.status(200).send(`Successfully pinged ${req.body.orgId}!`)
		})
		.catch(err => {
			console.log(err)
			res.status(500).send("Unable to send ping!")
		})
}

// ----- ACCEPT A PING (ORG)
// ----- "/users/acceptPing"
const acceptPing = (req, res, next) => {
	db
		.none(
			"UPDATE pings SET accepted=TRUE WHERE id=${pingId}", {
				pingId: req.body.pingId
			}
		)
		.then(() => {
			res.status(200).send(`Accepted ping for request id ${req.body.pingId}.`)
		})
		.catch(err => {
			res.status(500).json({
				error: err,
				message: "Error accepting ping."
			})
		})
}

// ----- DECLINE A PING (ORG)
// ----- "/users/declinePing"
const declinePing = (req, res, next) => {
	db
		.none(
			"UPDATE pings SET accepted=FALSE WHERE id=${pingId}", {
				pingId: req.body.pingId
			}
		)
		.then(() => {
			res.status(200).send(`Declined ping for request id ${req.body.pingId}.`)
		})
		.catch(err => {
			res.status(500).json({
				error: err,
				message: "Error declining ping."
			})
		})
}

module.exports = {
	registerVolunteer,
	registerOrganization,
	logoutUser,
	getUser,
	getAllEmails,
	getAllUsernames,
	getAllOrgs,
	getOrgIdByUsername,
	getAllVolunteers,
	getPingsSentByVolunteer,
	getPingsSentToOrg,
	sendPing,
	acceptPing,
	declinePing
};
