const router = require("express").Router();
const User = require("../models/User");
const _ = require("lodash");
const { validationResult } = require("express-validator/check");
const signupValidator = require("../middleware/signup");

// Sign up
router.post("/signup", signupValidator, (req, res) => {
  // Get Errors (if any) from validation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    res.status(422).send({ error: errors.array() });
  } else {
    // Get the required info into an object
    const body = _.pick(req.body, ["name", "email", "password"]);
    // Create new User Object
    const user = new User(body);

    // Save the User
    user
      .save(body)
      .then(() => {
        return user.getAuthToken();
      })
      .then(token => {
        res.header("x-auth", token).send(user);
      })
      .catch(e => res.status(400).send(e));
  }
});

// Login
router.post("/login", (req, res) => {});

module.exports = router;
