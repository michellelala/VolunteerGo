const passport = require('passport')
const pgp = require('pg-promise')({})
import dotenv from "dotenv";
dotenv.load();
const db = pgp(process.env.DATABASE_URL);


module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user.username)
	})

	passport.deserializeUser((username, done) => {
		db.one('SELECT id, username, name, org FROM users WHERE username=$1', [username])
			.then((user) => {
				return done(null, user)
			})
			.catch((err) => {
				return done(err, null)
			})
	})
}