var db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");


// --------------- USER AUTHENTICATION --------------- //

// REGISTER A NEW USER - THEN LOGIN THE USER
router.post("/register", db.registerUser, passport.authenticate("local"), (req, res) => {
  // delete req.user.password_digest;
  res.json({
    id: req.user.id,
    username: req.user.username,
    message: `${req.user.username} is logged in!`
  })
});
// ------ LOG IN USER
router.post("/login", passport.authenticate("local"), (req, res) => {
  delete req.user.password_digest;
  res.json({
    id: req.user.id,
    username: req.user.username,
    message: `${req.user.username} is logged in!`
  })}
);
// ------ LOG OUT USER
router.get("/logout", loginRequired, db.logoutUser);


// --------------- GET --------------- //

router.get("/getAllOrgs", db.getAllOrgs)
router.get("/getAllVolunteers", db.getAllVolunteers)



module.exports = router;
