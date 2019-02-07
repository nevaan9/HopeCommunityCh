const { check, body } = require("express-validator/check");
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
    })
    .normalizeEmail(),
  body(
    "password",
    "Please enter a password with only numbers and text and at least 6 characters."
  )
    .isLength({ min: 6 })
    .isAlphanumeric()
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

module.exports = signupValidator;
