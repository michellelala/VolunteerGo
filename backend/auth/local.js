// Authenticate username and passport with local strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const init = require("./passport");
const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/volunteergo");
const authHelpers = require("./helpers");

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    console.log("Trying to authenticate...");

    db
      .any("SELECT * FROM users WHERE username=$1", [username])
      .then(rows => {
        const user = rows[0];
        if (!user) {
          return done(null, false);
        }
        if (!authHelpers.comparePassword(password, user.password_digest)) {
          return done(null, false);
        } else {
          // everything passes, we can send the following to the frontend:
          return done(null, { 
            id: user.id, 
            username: user.username,
            name: user.name,
            org: user.org
          });
        }
      })
      .catch(err => {
        console.log("error: " + err);
        return done(err);
      });
  })
);

module.exports = passport;
