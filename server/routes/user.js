const router = require("express").Router();
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const _ = require("lodash");
const { validationResult } = require("express-validator/check");
const { signupValidator } = require("../middleware/signup");
const { resetValidator } = require("../middleware/reset");
const {
  confirmPasswordValidator
} = require("../middleware/confirmPasswordValidator");
const { authenticate } = require("../middleware/authenticate");
const User = require("../models/User");

// Email services
sgMail.setApiKey(process.env.EMAIL_API_KEY);

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

router.post("/reset-password", resetValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ error: errors.array() });
    return false;
  }
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.status(500).send("Could not generate token");
      return false;
    }
    const token = buffer.toString("hex");
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.status(422).send({
            error: [{ param: "email", msg: "That email does not exsit" }]
          });
          return false;
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        user
          .save()
          .then(() => {
            // OKAY NOW WE CAN SEND THE USER THE INFO :)
            const msg = {
              to: email,
              from: "hopecommunitychurchsl@gmail.com",
              subject: `Did you want to reset your password?`,
              html: `
              <strong>You requested a password reset link</strong>
              <p>Click this <a href="${
                process.env.WHITELIST
              }/reset/${token}">Password Reset Link</a> to set a new password</p>
              `
            };
            sgMail
              .send(msg)
              .then(() => {
                res.status(200).send("Password Reset Link Sent!");
              })
              .catch(err => {
                console.log(err.toString());
                res
                  .status(500)
                  .send("Sorry, we were not able to send the email");
              });
          })
          .catch(e => {
            console.log(e);
            res.status(500).send("Could not save user info");
            return false;
          });
      })
      .catch(e => {
        console.log(e);
        res.status(500).send({
          error: [{ param: "email", msg: "Error while looking for user" }]
        });
        return false;
      });
  });
});

router.get("/reset-password/:token", (req, res) => {
  const token = req.params.token;
  if (!token) {
    res.status(500).send("No token");
    return;
  }
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        res.status(500).send("User not found, or token expired");
        return;
      }
      return res.status(200).send({
        email: user.email,
        token
      });
    })
    .catch(e => {
      console.log(e);
      res.status(500).send("Error while looking for user");
      return;
    });
});

router.post("/confirm-reset-password", confirmPasswordValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ error: errors.array() });
  } else {
    const { email, resetToken, password } = req.body;
    User.findOne({ email, resetToken })
      .then(user => {
        // Our 'pre' save schema will hash it
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        user
          .save()
          .then(() => {
            res.status(200).send("Password Updated!");
          })
          .catch(e => {
            console.log(e);
            res.status(500).send("Error occured while saving user password");
          });
      })
      .catch(e => {
        console.log(e);
        res.status(500).send("Error looking for user");
      });
  }
});

module.exports = router;
