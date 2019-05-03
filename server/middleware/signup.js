const { body } = require("express-validator/check");
const User = require("../models/User");

const signupValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject(
            "Email already exists. Please choose another one."
          );
        }
      });
    }),
  body(
    "password",
    "Please enter a 8 character password, with at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character."
  )
    .isLength({ min: 8 })
    .custom(value => {
      const regex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
      if (regex.test(value)) {
        return true;
      } else {
        return false;
      }
    })
    .trim(),
  body("confirmpassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      } else {
        return true;
      }
    }),
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name field is empty")
];

module.exports = { signupValidator };
