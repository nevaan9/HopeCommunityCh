const router = require("express").Router();
const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");
const { signupValidator } = require("../middleware/signup");
const { authenticate } = require("../middleware/authenticate");

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
        return res.status(200).send(_.pick(savedUser, ["email", "name"]));
      })
      .catch(e => res.status(400).send(e));
  }
});

router.post;

// Login
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res
        .status(422)
        .send({ error: [{ param: "email", msg: "Invalid email" }] });
    }
    bcrypt.compare(req.body.password, user.password, (err, password) => {
      if (!password) {
        return res
          .status(422)
          .send({ error: [{ param: "password", msg: "Invalid password" }] });
      }
      user.removeExpTokens();
      user.getAuthToken().then(token => {
        const userData = _.pick(user, ["_id", "name", "email", "isAdmin"]);
        return res.header("x-auth", token).send(userData);
      });
    });
  });
});

router.get("/me", authenticate, (req, res) => {
  res.send(req.user);
});

// Logout
router.delete("/logout", authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

module.exports = router;
