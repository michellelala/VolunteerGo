var db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");


// --------------- USER AUTHENTICATION --------------- //
// ----- REGISTER A NEW VOLUNTEER - THEN LOGIN THE VOLUNTEER
router.post("/register/volunteer", db.registerVolunteer,
  passport.authenticate("local"), (req, res) => {
    // delete req.user.password_digest;
    res.json({
      id: req.user.id,
      username: req.user.username,
      name: req.user.name,
      org: req.user.org
    })
});
// ----- REGISTER A NEW ORGANIZATION - THEN LOGIN THE ORG
router.post("/register/organization", db.registerOrganization,
  passport.authenticate("local"), (req, res) => {
    delete req.user.password_digest;
    res.json({
      id: req.user.id,
      username: req.user.username,
      name: req.user.name,
      org: req.user.org
    })
});
// ------ LOG IN USER
router.post("/login", passport.authenticate("local"), (req, res) => {
  // delete req.user.password_digest;
  res.json({
    id: req.user.id,
    username: req.user.username,
    name: req.user.name,
    org: req.user.org
  })}
);
// ------ LOG OUT USER
router.get("/logout", loginRequired, db.logoutUser);


// --------------- GET --------------- //
router.get("/getUser", loginRequired, db.getUser);
router.get("/getAllEmails", db.getAllEmails)
router.get("/getAllUsernames", db.getAllUsernames)
router.get("/getAllOrgs", loginRequired, db.getAllOrgs)
router.get("/getOrgId/:orgUsername", loginRequired, db.getOrgIdByUsername)
router.get("/getAllVolunteers", loginRequired, db.getAllVolunteers)
router.get("/getPingsSentByVolunteer", loginRequired, db.getPingsSentByVolunteer)
router.get("/getPingsSentToOrg", loginRequired, db.getPingsSentToOrg)

// --------------- POST -------------- //
router.post("/addPing", loginRequired, db.sendPing)

// -------------- DELETE ------------- //

// --------------- PUT --------------- //
router.put("/acceptPing", loginRequired, db.acceptPing)


module.exports = router;
