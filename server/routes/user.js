const router = require("express").Router();
const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");
const { signupValidator } = require("../middleware/signup");

// Sign up
router.post("/signup", signupValidator, (req, res) => {
  // Get Errors (if any) from validation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ error: errors.array() });
  } else {
    // Get the required info into an object
    const body = _.pick(req.body, ["name", "email", "password"]);
    // Create new User Object
    const user = new User(body);

    // Save the User
    user
      .save(body)
      .then(savedUser => {
        res.status(200).send(savedUser);
      })
      .catch(e => res.status(400).send(e));
  }
});

router.post;

// Login
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.status(422).send({ error: ["Invalid Username"] });
    }
    bcrypt.compare(req.body.password, user.password, (err, password) => {
      if (!password) {
        res.status(422).send({ error: ["Invalid Password"] });
      } else {
        user.getAuthToken().then(token => {
          const userData = _.pick(user, ["_id", "name"]);
          res.header("x-auth", token).send(userData);
        });
      }
    });
  });
});

module.exports = router;
