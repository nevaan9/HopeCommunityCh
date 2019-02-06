const router = require("express").Router();
const User = require("../models/User");
const _ = require("lodash");

// Sign up
router.post("/signup", (req, res) => {
  // Get the required info into an object
  const body = _.pick(req.body, ["name", "email", "password"]);
  const cpw = req.body.confirmpassword;

  // Create new User Object
  const user = new User(body);

  // Save the User
  user
    .save(body)
    .then(user => {
      res.send(user);
    })
    .catch(e => res.status(400).send(e));
});

// Login
router.post("/login", (req, res) => {});

module.exports = router;
