const { body } = require("express-validator/check");

const confirmPasswordValidator = [
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
    })
];

module.exports = { confirmPasswordValidator };
